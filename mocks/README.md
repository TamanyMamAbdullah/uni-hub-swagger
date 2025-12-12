# Uni Hub Mock API

## 📁 Mock Data Structure

This directory contains mock JSON responses for all Uni Hub API endpoints.

### Directory Structure

```
mocks/
├── auth/                    # Authentication endpoints
│   ├── login.json
│   ├── register.json
│   ├── logout.json
│   ├── refresh-token.json
│   └── error-*.json
├── users/                  # User endpoints
│   ├── 123.json
│   ├── search.json
│   ├── followers.json
│   └── error-not-found.json
├── posts/                  # Post endpoints
│   ├── feed.json
│   ├── 456.json
│   └── comments.json
├── messages/               # Messaging endpoints
│   ├── conversations.json
│   └── conversation-detail.json
├── qa/                     # Q&A endpoints
│   ├── questions.json
│   └── question-detail.json
├── events/                 # Event endpoints
│   └── list.json
├── marketplace/            # Marketplace endpoints
│   └── listings.json
├── resources/              # Resource endpoints
│   └── list.json
├── notifications/          # Notification endpoints
│   └── list.json
├── groups/                 # Group endpoints
│   └── list.json
└── error-rate-limit.json   # Common errors
```

### 🔧 Usage Examples

#### Frontend Development
```javascript
// Base URL for GitHub Pages deployment
const API_BASE = 'https://username.github.io/uni-hub-swagger/mocks';

// Fetch user feed
fetch('${API_BASE}/posts/feed.json')
  .then(res => res.json())
  .then(data => console.log(data));

// Fetch user profile
fetch('${API_BASE}/users/123.json')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Available Endpoints

| Endpoint | Mock File | Method |
|----------|-----------|---------|
| `/api/v1/auth/login` | `auth/login.json` | POST |
| `/api/v1/users/{id}` | `users/123.json` | GET |
| `/api/v1/users/search` | `users/search.json` | GET |
| `/api/v1/posts/feed` | `posts/feed.json` | GET |
| `/api/v1/posts/{id}` | `posts/456.json` | GET |
| `/api/v1/messages/conversations` | `messages/conversations.json` | GET |
| `/api/v1/qa/questions` | `qa/questions.json` | GET |
| `/api/v1/events` | `events/list.json` | GET |
| `/api/v1/marketplace/listings` | `marketplace/listings.json` | GET |
| `/api/v1/notifications` | `notifications/list.json` | GET |
| `/api/v1/groups` | `groups/list.json` | GET |

### 📦 Response Format

All responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "hasMore": true
  },
  "timestamp": "2024-12-07T10:30:00Z"
}
```

### 🚀 Deployment

1. Run the setup script:
   ```bash
   node create-mocks.js
   ```

2. Push to GitHub Pages:
   ```bash
   git add .
   git commit -m "Add mock API files"
   git push origin gh-pages
   ```

### 📝 Notes

- All dates are in ISO 8601 format (UTC)
- Images use Unsplash and DiceBear for consistency
- IDs are strings for consistency with UUID format
- Error responses follow the same structure with `success: false`

### 🔄 Regenerating Mocks

To regenerate all mock files:
```bash
rm -rf mocks/
node create-mocks.js
```

---
*Last updated: 2025-12-12*
