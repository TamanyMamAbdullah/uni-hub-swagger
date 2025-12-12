# Master AI Script for Generating Uni Hub OpenAPI Modules

## Overview
This script guides AI assistants to generate individual OpenAPI 3.0.3 module files for the Uni Hub platform. Each module should be self-contained but reference shared components.

---

## Context Documents Required
Before generating any module, ensure you have access to:
1. **swagger_specs.md** - Complete API specification and conventions
2. **shared.yaml** - Common schemas and components
3. **Database schema** (Prisma) - For accurate field mappings

---

## Module Generation Prompt Template

Use this template when asking AI to generate a module:

```
You are generating the OpenAPI 3.0.3 specification for the {MODULE_NAME} module of the Uni Hub platform.

CONTEXT:
- Read and follow ALL conventions in the swagger_specs.md document
- Reference the shared.yaml file for common schemas
- Match database fields from the Prisma schema when defining response objects

MODULE: {MODULE_NAME}

REQUIREMENTS:

1. FILE STRUCTURE
   - Filename: modules/{MODULE_NAME}.yaml
   - Include ONLY these top-level keys:
     * openapi: 3.0.3
     * info: (title, version, description)
     * paths:
     * components: (if module has unique schemas)

2. PATH DEFINITIONS
   - Base path format: /api/v1/{resource}
   - Include ALL paths listed in swagger_specs.md section for this module
   - Each path must have:
     * Correct HTTP method (GET, POST, PUT, DELETE)
     * tags: [{MODULE_TAG}]
     * summary: Brief description
     * security: [] for public endpoints, omit for protected (uses global bearerAuth)
     * parameters: (path, query, header as needed)
     * requestBody: (for POST/PUT with schema and examples)
     * responses: (200, 201, 400, 401, 403, 404, 500 as appropriate)

3. RESPONSE STRUCTURE
   Every successful response (2xx) must use the standard envelope:
   ```yaml
   schema:
     allOf:
       - $ref: "../shared.yaml#/components/schemas/SuccessResponse"
       - type: object
         properties:
           data:
             # Your response data here
   ```

4. SCHEMA REFERENCES
   - Common types: Use $ref: "../shared.yaml#/components/schemas/{SchemaName}"
   - Common schemas include: UUID, Timestamp, Meta, Pagination, ErrorResponse, SuccessResponse, UserSummary
   - Module-specific schemas: Define in components/schemas section of this file

5. EXAMPLES
   - Include realistic example data for:
     * Request bodies
     * Response data
     * Query parameters
   - Use consistent UUIDs (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   - Use ISO 8601 timestamps (2025-01-20T12:00:00Z)

6. DATABASE MAPPING
   Refer to swagger_specs.md section 14 for field mappings:
   - Use snake_case in database, camelCase in API
   - Include all required fields
   - Mark optional fields as nullable: true
   - Use correct data types (string, integer, boolean, array, object)

7. VALIDATION
   Before outputting:
   - Verify all $ref paths are correct
   - Ensure all required fields are present
   - Check that examples are valid
   - Confirm paths match conventions in swagger_specs.md

OUTPUT FORMAT:
- Pure YAML syntax
- Proper indentation (2 spaces)
- Comments only where helpful
- No extra explanatory text outside YAML

GENERATE: modules/{MODULE_NAME}.yaml
```

---

## Available Modules

### 1. auth.yaml ✅ (Already generated)
- Authentication and authorization endpoints
- Register, login, logout, token refresh
- Email verification, password reset

### 2. users.yaml
**Tag:** Users & Profiles  
**Key Paths:**
- GET /users/{userId}
- PUT /users/{userId}
- POST /users/{userId}/avatar
- POST /users/{userId}/cover-photo
- GET /users/search
- POST /users/{userId}/follow
- DELETE /users/{userId}/follow
- GET /users/{userId}/followers
- GET /users/{userId}/following

**Key Schemas:** UserProfile, ProfilePrivacy, UserStatsSummary

### 3. posts.yaml
**Tag:** Posts & Comments  
**Key Paths:**
- GET /posts/feed
- POST /posts
- GET /posts/{postId}
- PUT /posts/{postId}
- DELETE /posts/{postId}
- POST /posts/{postId}/react
- POST /posts/{postId}/comments
- GET /posts/{postId}/comments
- POST /posts/{postId}/share
- POST /posts/{postId}/bookmark

**Key Schemas:** Post, PostMedia, Comment, Reaction, PostStats

### 4. messages.yaml
**Tag:** Messaging  
**Key Paths:**
- GET /messages/conversations
- GET /messages/conversations/{conversationId}
- POST /messages
- PUT /messages/{messageId}
- DELETE /messages/{messageId}
- POST /conversations
- POST /conversations/{conversationId}/members
- DELETE /conversations/{conversationId}/members/{userId}

**Key Schemas:** Conversation, Message, MessageReaction, ReadReceipt

### 5. qa.yaml
**Tag:** Q&A  
**Key Paths:**
- GET /qa/questions
- POST /qa/questions
- GET /qa/questions/{id}
- PUT /qa/questions/{id}
- DELETE /qa/questions/{id}
- POST /qa/questions/{id}/answers
- POST /qa/answers/{id}/vote
- POST /qa/answers/{id}/accept

**Key Schemas:** Question, Answer, QAVote, TagSummary

### 6. events.yaml
**Tag:** Events  
**Key Paths:**
- GET /events
- POST /events
- GET /events/{id}
- PUT /events/{id}
- DELETE /events/{id}
- POST /events/{id}/rsvp
- DELETE /events/{id}/rsvp
- GET /calendar/personal

**Key Schemas:** Event, RSVP, RecurrenceRule

### 7. marketplace.yaml
**Tag:** Marketplace  
**Key Paths:**
- GET /marketplace/listings
- POST /marketplace/listings
- GET /marketplace/listings/{id}
- PUT /marketplace/listings/{id}
- DELETE /marketplace/listings/{id}
- POST /marketplace/listings/{id}/offer
- PUT /marketplace/listings/{id}/mark-sold

**Key Schemas:** Listing, Offer, ListingImage, ListingStats

### 8. resources.yaml
**Tag:** Resources  
**Key Paths:**
- POST /resources/upload
- GET /resources/{resourceId}
- GET /resources/{resourceId}/download
- PUT /resources/{resourceId}
- POST /resources/{resourceId}/share

**Key Schemas:** Resource, ResourceVersion, ResourcePermission

### 9. notifications.yaml
**Tag:** Notifications  
**Key Paths:**
- GET /notifications
- GET /notifications/unread-count
- PUT /notifications/{id}/read
- PUT /notifications/mark-all-read
- GET /notifications/preferences
- PUT /notifications/preferences

**Key Schemas:** Notification, NotificationPreference

### 10. moderation.yaml
**Tag:** Moderation  
**Key Paths:**
- POST /reports
- GET /moderation/reports
- PUT /moderation/reports/{id}
- POST /moderation/actions

**Key Schemas:** Report, ModerationAction, Warning

---

## Example Usage

To generate the `users.yaml` module:

```
Generate the users.yaml module following the master AI script template.
Module: users
Refer to swagger_specs.md section 5 for detailed specifications.
```

---

## After Generation Checklist

Once a module is generated:
- [ ] Save file to `modules/{MODULE_NAME}.yaml`
- [ ] Run `npm run bundle` to regenerate combined spec
- [ ] Validate with `npx swagger-cli validate dist/openapi.json`
- [ ] Check Swagger UI at https://tamanymamabdullah.github.io/uni-hub-swagger/
- [ ] Commit and push changes

---

## Bundling Process

The modular files are combined using `bundle-openapi.js`:

1. Reads `shared.yaml` for common components
2. Reads all `modules/*.yaml` files
3. Merges paths and schemas
4. Resolves `$ref` references
5. Outputs `dist/openapi.json` and `dist/openapi.yaml`

**Command:** `npm run bundle`

---

## Best Practices

1. **Consistency:** Follow naming conventions (camelCase for API, snake_case for DB)
2. **Completeness:** Include all CRUD operations where applicable
3. **Examples:** Provide realistic, helpful examples
4. **Security:** Mark public endpoints explicitly with `security: []`
5. **Pagination:** Use cursor-based pagination for lists
6. **Errors:** Include appropriate error responses (400, 401, 403, 404, 500)
7. **Documentation:** Add clear summaries and descriptions

---

## Troubleshooting

**Problem:** Bundle fails with "Cannot find module"  
**Solution:** Ensure all referenced modules exist in `modules/` directory

**Problem:** Swagger UI shows "No operations defined"  
**Solution:** Run `npm run bundle` and commit `dist/openapi.json`

**Problem:** Schema references not resolving  
**Solution:** Check `$ref` paths use `../shared.yaml#/components/schemas/`

---

## Version History

- v1.0 - Initial master script (Dec 2024)
- v1.1 - Added bundling automation (Jan 2025)

---

*For questions or updates, refer to swagger_specs.md or contact the API team.*