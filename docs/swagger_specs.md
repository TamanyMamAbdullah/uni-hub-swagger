# Uni Hub — Swagger Specifications (Modular)

> **Purpose:** This markdown is a machine- and human-friendly specification to generate a modular OpenAPI/Swagger set for the Uni Hub platform. Use each module spec (auth, users, posts, messages, qa, events, marketplace, notifications, resources, moderation) as a separate YAML/JSON file (e.g. `auth.yaml`, `users.yaml`, ...).

---

## Table of Contents
1. Goals & conventions
2. Project-wide OpenAPI boilerplate
3. Modules overview (files to produce)
4. Module: Authentication — spec summary
5. Module: Users & Profiles — spec summary
6. Module: Posts & Comments — spec summary
7. Module: Messaging & Conversations — spec summary
8. Module: Q&A — spec summary
9. Module: Events — spec summary
10. Module: Marketplace — spec summary
11. Module: Resources — spec summary
12. Module: Notifications — spec summary
13. Module: Moderation & Reports — spec summary
14. Database → API mapping (selected models)
15. Common schemas & examples
16. Security, rate-limits, pagination, errors
17. How to use this file (for AIs / tools)
18. Next steps & checklist

---

## 1) Goals & conventions
- Produce **modular OpenAPI 3.0.3** files (YAML recommended).
- One module per file. Each module includes: `paths`, `components/schemas` (local), references to shared `components` where needed.
- Shared components (securitySchemes, ErrorResponse, Pagination, SuccessResponse) live in `/_components/shared.yaml` and are referenced by `$ref` from each module.
- Use `servers` to point to `https://api.unihub.example.com` and local `http://localhost:3000` during development.
- API base path: `/api/v1`.
- Auth: `Bearer` JWT (access + refresh token flow).
- Response envelope format (standardized):

```json
{
  "success": true,
  "data": { ... },
  "meta": { ... },
  "timestamp": "2024-12-07T10:30:00Z"
}
```

Reference: project API spec and response formats in the docs.

---

## 2) Project-wide OpenAPI boilerplate (shared/_components/shared.yaml)
- `openapi: 3.0.3`
- `components:`
  - `securitySchemes:`
    - `bearerAuth` (type: http, scheme: bearer, bearerFormat: JWT)
  - `schemas:`
    - `ErrorResponse`, `SuccessResponse`, `Pagination`, `Meta`, `UserSummary`, `UUID` etc.
- `security:` global requirement for protected endpoints (`bearerAuth`).

---

## 3) Modules to produce (files)
- `auth.yaml` — Authentication
- `users.yaml` — Users & Profiles
- `posts.yaml` — Posts, Media, Comments, Reactions
- `messages.yaml` — Conversations & Messages
- `qa.yaml` — Q&A (questions, answers, votes)
- `events.yaml` — Events & RSVPs
- `marketplace.yaml` — Listings, Offers
- `resources.yaml` — File uploads, permissions
- `notifications.yaml` — Notification retrieval & preferences
- `moderation.yaml` — Reports, moderation actions
- `shared.yaml` — Shared components and common schemas

Each module file must include example requests/responses and reference `shared.yaml` for common types.

---

## 4) Module: Authentication — spec summary (`auth.yaml`)
Paths (examples):
- `POST /api/v1/auth/register` — request: email, password, firstName, lastName, universityEmail (optional). Response: `201` with `SuccessResponse` and `user` summary.
- `POST /api/v1/auth/login` — request: email, password. Response: `200` with `accessToken`, `refreshToken` in secure cookie and body.
- `POST /api/v1/auth/refresh` — request: refresh token cookie, returns new access token.
- `POST /api/v1/auth/logout` — invalidates refresh token.
- `POST /api/v1/auth/verify-email` — token in body.
- `POST /api/v1/auth/forgot-password` and `POST /api/v1/auth/reset-password`.

Schemas to include locally: `RegisterRequest`, `LoginRequest`, `TokenResponse`, `AuthError`.

Notes: include `5xx` and auth-specific `401/403` responses.

---

## 5) Module: Users & Profiles (`users.yaml`)
Paths:
- `GET /api/v1/users/{userId}` — returns full profile (subject to privacy settings)
- `PUT /api/v1/users/{userId}` — update profile fields
- `POST /api/v1/users/{userId}/avatar` — multipart/form-data upload
- `POST /api/v1/users/{userId}/cover-photo`
- `GET /api/v1/users/search` — query params: q, tags, major, year, dept
- `POST /api/v1/users/{userId}/follow` and `DELETE` for unfollow
- `GET /api/v1/users/{userId}/followers` and `/following`

Schemas: `UserProfile`, `ProfilePrivacy`, `ProfileExtras`, `UserStatsSummary`.

Mapping: core user fields derived from Prisma `users` and `profiles` models. See DB schema for enums `user_role`, `visibility_level`, etc. (prisma schema).

---

## 6) Module: Posts & Comments (`posts.yaml`)
Paths:
- `GET /api/v1/posts/feed` — params: type, tag, cursor, limit
- `POST /api/v1/posts` — body: content, postType, media[], visibility, tags, scheduledAt
- `GET /api/v1/posts/{postId}`
- `PUT /api/v1/posts/{postId}`
- `DELETE /api/v1/posts/{postId}`
- `POST /api/v1/posts/{postId}/react` — body: reactionType
- `POST /api/v1/posts/{postId}/comments` — body: content, parentId?
- `GET /api/v1/posts/{postId}/comments` — supports pagination
- `POST /api/v1/posts/{postId}/share`
- `POST /api/v1/posts/{postId}/bookmark`

Schemas: `Post`, `PostMedia`, `PostDraft`, `Comment`, `PostStats`, `Reaction`.

Notes: media upload endpoints may be delegated to `resources` module or pre-signed S3 flow.

---

## 7) Module: Messaging & Conversations (`messages.yaml`)
Paths:
- `GET /api/v1/messages/conversations` — list user conversations
- `GET /api/v1/messages/conversations/{conversationId}` — messages (cursor-based)
- `POST /api/v1/messages` — send message (conversationId, content, attachments[])
- `PUT /api/v1/messages/{messageId}` — edit
- `DELETE /api/v1/messages/{messageId}` — delete
- `POST /api/v1/conversations` — create group/direct conversation
- `POST /api/v1/conversations/{conversationId}/members`
- `DELETE /api/v1/conversations/{conversationId}/members/{userId}`

Schemas: `Conversation`, `Message`, `MessageReaction`, `ReadReceipt`.

Real-time: mention in docs that websocket events cover `message.created`, `message.read`, `typing`, `presence`.

---

## 8) Module: Q&A (`qa.yaml`)
Paths:
- `GET /api/v1/qa/questions` — list (filters: tags, unanswered, trending)
- `POST /api/v1/qa/questions` — create question (title, content, tags, anonymous)
- `GET /api/v1/qa/questions/{id}`
- `PUT /api/v1/qa/questions/{id}`
- `DELETE /api/v1/qa/questions/{id}`
- `POST /api/v1/qa/questions/{id}/answers` — add answer
- `POST /api/v1/qa/answers/{id}/vote` — upvote/downvote
- `POST /api/v1/qa/answers/{id}/accept` — question owner accepts

Schemas: `Question`, `Answer`, `QAVote`, `TagSummary`.

---

## 9) Module: Events (`events.yaml`)
Paths:
- `GET /api/v1/events` — list
- `POST /api/v1/events` — create (title, startTime, endTime, location, capacity, virtualLink, recurrenceRule)
- `GET /api/v1/events/{id}`
- `PUT /api/v1/events/{id}`
- `DELETE /api/v1/events/{id}`
- `POST /api/v1/events/{id}/rsvp` — rsvp status
- `DELETE /api/v1/events/{id}/rsvp`
- `GET /api/v1/calendar/personal` — user's combined calendar

Schemas: `Event`, `RSVP`, `RecurrenceRule`.

---

## 10) Module: Marketplace (`marketplace.yaml`)
Paths:
- `GET /api/v1/marketplace/listings` — filters: category, condition, price range
- `POST /api/v1/marketplace/listings` — create listing
- `GET /api/v1/marketplace/listings/{id}`
- `PUT /api/v1/marketplace/listings/{id}`
- `DELETE /api/v1/marketplace/listings/{id}`
- `POST /api/v1/marketplace/listings/{id}/offer` — send offer
- `PUT /api/v1/marketplace/listings/{id}/mark-sold`

Schemas: `Listing`, `Offer`, `ListingImage`, `ListingStats`.

---

## 11) Module: Resources (`resources.yaml`)
Paths:
- `POST /api/v1/resources/upload` — multipart upload or pre-signed URL flow
- `GET /api/v1/resources/{resourceId}` — metadata
- `GET /api/v1/resources/{resourceId}/download`
- `PUT /api/v1/resources/{resourceId}` — update metadata/permissions
- `POST /api/v1/resources/{resourceId}/share` — share with user/group

Schemas: `Resource`, `ResourceVersion`, `ResourcePermission`.

Notes: storage: S3 / R2. Include `max file size`, `allowed mime types`.

---

## 12) Module: Notifications (`notifications.yaml`)
Paths:
- `GET /api/v1/notifications` — paginated
- `GET /api/v1/notifications/unread-count`
- `PUT /api/v1/notifications/{id}/read`
- `PUT /api/v1/notifications/mark-all-read`
- `GET /api/v1/notifications/preferences`
- `PUT /api/v1/notifications/preferences`

Schemas: `Notification`, `NotificationPreference`.

---

## 13) Module: Moderation & Reports (`moderation.yaml`)
Paths:
- `POST /api/v1/reports` — submit content/user report
- `GET /api/v1/moderation/reports` — (admin) list reports
- `PUT /api/v1/moderation/reports/{id}` — update status, assign
- `POST /api/v1/moderation/actions` — apply ban, warning, remove content

Schemas: `Report`, `ModerationAction`, `Warning`.

---

## 14) Database → API mapping (selected models)
This section maps Prisma/db models to API schemas. Use it to auto-generate `components/schemas`.

### users / profiles (combined API shape: `UserProfile`)
- `id`, `uuid`, `email`, `role` (enum), `first_name`, `last_name`, `pronouns?`, `is_verified`, `is_active`, `reputation_score`, `created_at`, `updated_at`.
- profile extras: `avatar_url`, `cover_photo_url`, `bio`, `major`, `graduation_year`, `location`, `timezone`, `locale`.

### posts
- `id`, `uuid`, `user_id`, `content`, `post_type`, `visibility`, `category`, `media[]` (resource refs), `allow_comments`, `published_at`, `created_at`.

### comments
- `id`, `uuid`, `post_id`, `user_id`, `content`, `parent_id?`, `path`, `depth`, `created_at`, `updated_at`.

### messages / conversations
- `conversations`: `id`, `uuid`, `type`, `title`, `created_by`, `created_at`.
- `messages`: `id`, `conversation_id`, `sender_id`, `content`, `message_type`, `attachments[]`, `created_at`.

### events
- `events`: `id`, `organizer_id`, `title`, `description`, `start_time`, `end_time`, `location`, `category`, `capacity`, `is_recurring`, `recurrence_rule`, `created_at`.

(Use full Prisma models as authoritative source — provided in uploaded prisma schema.)

Reference: Prisma schema file and docs. Use these models when generating component schemas.

---

## 15) Common schemas & examples
Include in `shared.yaml`:
- `SuccessResponse`
- `ErrorResponse`:
  - `code` (string), `message` (string), `details` (array)
- `Pagination` (cursor, limit, nextCursor)
- `Meta` (page, limit, total, hasMore)
- `UUID` (string, format: uuid)

Provide JSON examples for `UserProfile`, `Post`, `Comment`, `Message`.

---

## 16) Security, rate-limits, pagination, errors
- Security: `bearerAuth` for most endpoints. Public endpoints: register, login, public feed, listings.
- Rate limits: Document per-tier in `shared.yaml` as `x-rate-limit` vendor extension.
- Pagination: Cursor-based by default, `limit` param with max 100, default 20.
- Error handling: Standardized error envelopes with HTTP status codes and `ErrorResponse` body.

---

## 17) How to use this file (for AIs / tools)
1. Use the `shared.yaml` template to create a canonical `components` file.
2. For each module in section 3, create a YAML file containing `paths` + `components/schemas` referenced from shared.
3. Validate each generated YAML with `swagger-cli validate` or `openapi-generator`.
4. Use `openapi-generator` to produce server stubs or client SDKs.
5. For frontend mocking, create Postman / Mockoon collections from each module.

Tip for AI: Feed this `.md` file as the first prompt, then request the AI to output **one module file** per reply (e.g. `auth.yaml`). Use consistent filenames.

---

## 18) Next steps & checklist
- [ ] I will generate `shared.yaml` (components) (ask me to start)
- [ ] Then `auth.yaml` (complete with request/response examples)
- [ ] Then `users.yaml` → `posts.yaml` → `messages.yaml` → `qa.yaml` → `events.yaml` → `marketplace.yaml` → `resources.yaml` → `notifications.yaml` → `moderation.yaml`
- [ ] Validate and iterate on each module
- [ ] Produce single combined `openapi.yaml` if desired after review

---

*Generated from project documentation and Prisma schema provided by you. For detailed field mapping, refer to the Prisma schema file in the repository for types and enums.*








npx swagger-cli bundle openapi.yaml --outfile dist/openapi.json --type json



npx swagger-cli bundle swagger/uni-hub-swagger/openapi.yaml   --outfile swagger/uni-hub-swagger/dist/openapi.json   --type json   --dereference
Created swagger\uni-hub-swagger\dist\openapi.json from swagger/uni-hub-swagger/openapi.yaml