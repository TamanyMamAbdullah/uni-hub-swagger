#!/usr/bin/env node
/*eslint-disable*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Creating Uni Hub Mock API Structure...\n');

// Base directories - use current directory
const baseDir = __dirname;
const mocksDir = path.join(baseDir);
const subDirs = [
  'auth',
  'users',
  'posts',
  'messages',
  'qa',
  'events',
  'marketplace',
  'resources',
  'notifications',
  'groups'
];

// Create directories
console.log('📁 Creating directory structure...');
subDirs.forEach(dir => {
  const fullPath = path.join(mocksDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  Created: ${dir}/`);
  }
});

// ========== AUTHENTICATION MOCKS ==========
console.log('\n🔐 Creating authentication mocks...');

// POST /api/v1/auth/register
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'register.json'),
  JSON.stringify({
    success: true,
    data: {
      user: {
        id: "123",
        email: "student@university.edu",
        firstName: "John",
        lastName: "Doe",
        role: "student",
        isVerified: false,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
      },
      verificationToken: "verification_token_mock"
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// POST /api/v1/auth/login
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'login.json'),
  JSON.stringify({
    success: true,
    data: {
      user: {
        id: "123",
        email: "student@university.edu",
        firstName: "John",
        lastName: "Doe",
        role: "student",
        isVerified: true,
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
      },
      tokens: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock",
        refreshToken: "refresh_token_mock",
        expiresIn: 900
      }
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// POST /api/v1/auth/logout
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'logout.json'),
  JSON.stringify({
    success: true,
    data: { message: "Logged out successfully" },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// POST /api/v1/auth/refresh-token
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'refresh-token.json'),
  JSON.stringify({
    success: true,
    data: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.new_token",
      expiresIn: 900
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== USERS MOCKS ==========
console.log('👤 Creating users mocks...');

// GET /api/v1/users/{userId}
fs.writeFileSync(
  path.join(mocksDir, 'users', '123.json'),
  JSON.stringify({
    success: true,
    data: {
      id: "123",
      email: "john.doe@university.edu",
      firstName: "John",
      lastName: "Doe",
      role: "student",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      coverPhotoUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      bio: "Computer Science major passionate about AI and web development.",
      pronouns: "he/him",
      major: "Computer Science",
      graduationYear: 2025,
      department: "Engineering",
      skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
      interests: ["Web Development", "AI Research", "Hackathons", "Open Source"],
      socialLinks: {
        github: "johndoe",
        linkedin: "in/johndoe",
        portfolio: "https://johndoe.dev"
      },
      stats: {
        followersCount: 156,
        followingCount: 89,
        postsCount: 42,
        reputationScore: 1250
      },
      isVerified: true,
      createdAt: "2024-01-15T09:30:00Z",
      lastActiveAt: "2024-12-07T10:15:00Z"
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/users/search
fs.writeFileSync(
  path.join(mocksDir, 'users', 'search.json'),
  JSON.stringify({
    success: true,
    data: {
      users: [
        {
          id: "123",
          firstName: "John",
          lastName: "Doe",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          major: "Computer Science",
          graduationYear: 2025,
          skills: ["JavaScript", "React", "Node.js"],
          isVerified: true
        },
        {
          id: "124",
          firstName: "Jane",
          lastName: "Smith",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          major: "Biology",
          graduationYear: 2024,
          skills: ["Research", "Lab Techniques", "Data Analysis"],
          isVerified: true
        },
        {
          id: "125",
          firstName: "Alex",
          lastName: "Johnson",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          major: "Business",
          graduationYear: 2026,
          skills: ["Marketing", "Finance", "Leadership"],
          isVerified: false
        },
        {
          id: "126",
          firstName: "Sarah",
          lastName: "Williams",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          major: "Psychology",
          graduationYear: 2025,
          skills: ["Research", "Counseling", "Statistics"],
          isVerified: true
        },
        {
          id: "127",
          firstName: "Mike",
          lastName: "Brown",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
          major: "Engineering",
          graduationYear: 2024,
          skills: ["CAD", "Mechanics", "Physics"],
          isVerified: true
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 5,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/users/{userId}/followers
fs.writeFileSync(
  path.join(mocksDir, 'users', 'followers.json'),
  JSON.stringify({
    success: true,
    data: {
      followers: [
        {
          id: "124",
          firstName: "Jane",
          lastName: "Smith",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          mutualCount: 12
        },
        {
          id: "125",
          firstName: "Alex",
          lastName: "Johnson",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          mutualCount: 8
        },
        {
          id: "126",
          firstName: "Sarah",
          lastName: "Williams",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          mutualCount: 15
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== POSTS MOCKS ==========
console.log('📝 Creating posts mocks...');

// GET /api/v1/posts/feed
fs.writeFileSync(
  path.join(mocksDir, 'posts', 'feed.json'),
  JSON.stringify({
    success: true,
    data: {
      posts: [
        {
          id: "456",
          user: {
            id: "123",
            firstName: "John",
            lastName: "Doe",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            isVerified: true
          },
          content: "Just finished my final project for CS401! Built a full-stack React/Node.js application with real-time features. Learned so much about WebSockets and state management. #cs401 #react #webdev",
          postType: "text",
          mediaUrls: [
            "https://images.unsplash.com/photo-1551650975-87deedd944c3"
          ],
          tags: ["cs401", "react", "webdev", "programming"],
          visibility: "university",
          reactions: {
            like: 24,
            love: 8,
            laugh: 3,
            surprise: 1,
            sad: 0,
            angry: 0
          },
          commentCount: 12,
          shareCount: 5,
          bookmarkCount: 3,
          isEdited: false,
          createdAt: "2024-12-06T14:30:00Z",
          updatedAt: "2024-12-06T14:30:00Z"
        },
        {
          id: "457",
          user: {
            id: "201",
            firstName: "Dr.",
            lastName: "Smith",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
            isVerified: true,
            role: "teacher"
          },
          content: "Reminder: CS301 midterm exam tomorrow at 10 AM in Room 205. Bring your student ID and calculator. Good luck everyone!",
          postType: "announcement",
          tags: ["cs301", "exam", "reminder"],
          visibility: "university",
          reactions: {
            like: 45,
            love: 2,
            laugh: 0,
            surprise: 12,
            sad: 5,
            angry: 1
          },
          commentCount: 8,
          shareCount: 15,
          bookmarkCount: 23,
          isEdited: false,
          createdAt: "2024-12-06T09:15:00Z",
          updatedAt: "2024-12-06T09:15:00Z"
        },
        {
          id: "458",
          user: {
            id: "124",
            firstName: "Jane",
            lastName: "Smith",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            isVerified: true
          },
          content: "Biology lab results are in! Our group's experiment on plant growth with different light spectrums yielded fascinating results. The full paper is now available in the resources section. #biology #research #science",
          postType: "text",
          mediaUrls: [
            "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5",
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d"
          ],
          tags: ["biology", "research", "science", "lab"],
          visibility: "university",
          reactions: {
            like: 31,
            love: 15,
            laugh: 2,
            surprise: 8,
            sad: 0,
            angry: 0
          },
          commentCount: 7,
          shareCount: 3,
          bookmarkCount: 9,
          isEdited: true,
          createdAt: "2024-12-05T16:45:00Z",
          updatedAt: "2024-12-05T17:20:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: true
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/posts/{postId}
fs.writeFileSync(
  path.join(mocksDir, 'posts', '456.json'),
  JSON.stringify({
    success: true,
    data: {
      id: "456",
      user: {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        isVerified: true,
        major: "Computer Science"
      },
      content: "Just finished my final project for CS401! Built a full-stack React/Node.js application with real-time features. Learned so much about WebSockets and state management. #cs401 #react #webdev",
      postType: "text",
      mediaUrls: [
        {
          url: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
          type: "image",
          width: 1920,
          height: 1080
        }
      ],
      tags: ["cs401", "react", "webdev", "programming"],
      visibility: "university",
      stats: {
        viewCount: 245,
        reactionCount: 36,
        commentCount: 12,
        shareCount: 5,
        bookmarkCount: 3
      },
      reactions: {
        like: 24,
        love: 8,
        laugh: 3,
        surprise: 1,
        sad: 0,
        angry: 0,
        users: [
          { id: "124", firstName: "Jane", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
          { id: "125", firstName: "Alex", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
          { id: "126", firstName: "Sarah", avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" }
        ]
      },
      allowComments: true,
      allowReactions: true,
      isEdited: false,
      createdAt: "2024-12-06T14:30:00Z",
      updatedAt: "2024-12-06T14:30:00Z"
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/posts/{postId}/comments
fs.writeFileSync(
  path.join(mocksDir, 'posts', 'comments.json'),
  JSON.stringify({
    success: true,
    data: {
      comments: [
        {
          id: "789",
          user: {
            id: "124",
            firstName: "Jane",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
          },
          content: "Great work John! The UI looks amazing. Can you share the GitHub repo?",
          reactions: { like: 5, love: 1 },
          isEdited: false,
          createdAt: "2024-12-06T15:10:00Z",
          replies: [
            {
              id: "790",
              user: {
                id: "123",
                firstName: "John",
                avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              },
              content: "Thanks Jane! Here's the repo: https://github.com/johndoe/cs401-project",
              reactions: { like: 2 },
              isEdited: false,
              createdAt: "2024-12-06T15:15:00Z"
            }
          ]
        },
        {
          id: "791",
          user: {
            id: "125",
            firstName: "Alex",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          },
          content: "Impressive! Which WebSocket library did you use?",
          reactions: { like: 3 },
          isEdited: false,
          createdAt: "2024-12-06T15:30:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 2,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== MESSAGING MOCKS ==========
console.log('💬 Creating messaging mocks...');

// GET /api/v1/messages/conversations
fs.writeFileSync(
  path.join(mocksDir, 'messages', 'conversations.json'),
  JSON.stringify({
    success: true,
    data: {
      conversations: [
        {
          id: "conv_001",
          type: "direct",
          participants: [
            {
              id: "123",
              firstName: "John",
              lastName: "Doe",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            },
            {
              id: "124",
              firstName: "Jane",
              lastName: "Smith",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
            }
          ],
          lastMessage: {
            id: "msg_456",
            content: "Hey, are you going to the hackathon this weekend?",
            senderId: "124",
            timestamp: "2024-12-07T10:15:00Z",
            isRead: false
          },
          unreadCount: 2,
          isMuted: false,
          isPinned: true,
          updatedAt: "2024-12-07T10:15:00Z"
        },
        {
          id: "conv_002",
          type: "group",
          title: "CS401 Study Group",
          avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CS401",
          participants: [
            {
              id: "123",
              firstName: "John",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            },
            {
              id: "125",
              firstName: "Alex",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
            },
            {
              id: "126",
              firstName: "Sarah",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
            }
          ],
          lastMessage: {
            id: "msg_457",
            content: "I've uploaded the study notes for Chapter 5",
            senderId: "126",
            timestamp: "2024-12-07T09:45:00Z",
            isRead: true
          },
          unreadCount: 0,
          isMuted: false,
          isPinned: false,
          updatedAt: "2024-12-07T09:45:00Z"
        },
        {
          id: "conv_003",
          type: "direct",
          participants: [
            {
              id: "123",
              firstName: "John",
              lastName: "Doe",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            },
            {
              id: "201",
              firstName: "Dr.",
              lastName: "Smith",
              avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith",
              role: "teacher"
            }
          ],
          lastMessage: {
            id: "msg_458",
            content: "Your assignment has been graded. Please check the portal for feedback.",
            senderId: "201",
            timestamp: "2024-12-06T16:30:00Z",
            isRead: true
          },
          unreadCount: 0,
          isMuted: true,
          isPinned: false,
          updatedAt: "2024-12-06T16:30:00Z"
        }
      ]
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/messages/conversations/{conversationId}
fs.writeFileSync(
  path.join(mocksDir, 'messages', 'conversation-detail.json'),
  JSON.stringify({
    success: true,
    data: {
      id: "conv_001",
      type: "direct",
      participants: [
        {
          id: "123",
          firstName: "John",
          lastName: "Doe",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
          isOnline: true,
          lastSeen: "2024-12-07T10:15:00Z"
        },
        {
          id: "124",
          firstName: "Jane",
          lastName: "Smith",
          avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
          isOnline: false,
          lastSeen: "2024-12-07T10:10:00Z"
        }
      ],
      messages: [
        {
          id: "msg_450",
          senderId: "124",
          content: "Hi John! How's the CS401 project going?",
          messageType: "text",
          isRead: true,
          createdAt: "2024-12-07T09:30:00Z"
        },
        {
          id: "msg_451",
          senderId: "123",
          content: "Going well! Just finished the WebSocket implementation",
          messageType: "text",
          isRead: true,
          createdAt: "2024-12-07T09:32:00Z"
        },
        {
          id: "msg_452",
          senderId: "124",
          content: "That's awesome! I'm struggling with the auth part",
          messageType: "text",
          isRead: true,
          createdAt: "2024-12-07T09:35:00Z"
        },
        {
          id: "msg_453",
          senderId: "123",
          content: "I can help! Let's meet at the library tomorrow",
          messageType: "text",
          isRead: true,
          createdAt: "2024-12-07T09:40:00Z"
        },
        {
          id: "msg_456",
          senderId: "124",
          content: "Hey, are you going to the hackathon this weekend?",
          messageType: "text",
          isRead: false,
          createdAt: "2024-12-07T10:15:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 50,
      total: 5,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== Q&A MOCKS ==========
console.log('❓ Creating Q&A mocks...');

// GET /api/v1/qa/questions
fs.writeFileSync(
  path.join(mocksDir, 'qa', 'questions.json'),
  JSON.stringify({
    success: true,
    data: {
      questions: [
        {
          id: "q_001",
          title: "How to implement JWT authentication in Node.js?",
          content: "I'm building a REST API with Express and need to implement JWT authentication. What's the best practice for handling refresh tokens?",
          user: {
            id: "123",
            firstName: "John",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          },
          tags: ["nodejs", "jwt", "authentication", "express", "backend"],
          stats: {
            upvotes: 15,
            downvotes: 2,
            answers: 3,
            views: 124,
            score: 13
          },
          isAnswered: true,
          acceptedAnswerId: "ans_001",
          isAnonymous: false,
          isUrgent: false,
          createdAt: "2024-12-05T14:20:00Z",
          updatedAt: "2024-12-06T10:30:00Z"
        },
        {
          id: "q_002",
          title: "Best resources for learning React hooks?",
          content: "Looking for tutorials, courses, or documentation specifically focused on React hooks. Any recommendations?",
          user: {
            id: "127",
            firstName: "Mike",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
          },
          tags: ["react", "hooks", "frontend", "learning", "javascript"],
          stats: {
            upvotes: 8,
            downvotes: 0,
            answers: 5,
            views: 89,
            score: 8
          },
          isAnswered: true,
          acceptedAnswerId: "ans_003",
          isAnonymous: false,
          isUrgent: false,
          createdAt: "2024-12-04T11:15:00Z",
          updatedAt: "2024-12-05T16:45:00Z"
        },
        {
          id: "q_003",
          title: "Calculus II - Integration by parts problem",
          content: "Stuck on this integration problem: ∫ x² e^x dx. Can someone walk me through the steps?",
          user: {
            id: "124",
            firstName: "Jane",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
          },
          tags: ["calculus", "math", "integration", "homework"],
          stats: {
            upvotes: 5,
            downvotes: 1,
            answers: 2,
            views: 67,
            score: 4
          },
          isAnswered: false,
          isAnonymous: false,
          isUrgent: true,
          createdAt: "2024-12-06T18:30:00Z",
          updatedAt: "2024-12-06T18:30:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: true
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// GET /api/v1/qa/questions/{questionId}
fs.writeFileSync(
  path.join(mocksDir, 'qa', 'question-detail.json'),
  JSON.stringify({
    success: true,
    data: {
      id: "q_001",
      title: "How to implement JWT authentication in Node.js?",
      content: "I'm building a REST API with Express and need to implement JWT authentication. What's the best practice for handling refresh tokens? Should I store them in a database or use Redis? Also, how do I handle token rotation securely?",
      user: {
        id: "123",
        firstName: "John",
        lastName: "Doe",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        major: "Computer Science",
        reputationScore: 1250
      },
      tags: ["nodejs", "jwt", "authentication", "express", "backend", "security"],
      stats: {
        upvotes: 15,
        downvotes: 2,
        answers: 3,
        views: 124,
        score: 13
      },
      isAnswered: true,
      acceptedAnswerId: "ans_001",
      isAnonymous: false,
      isUrgent: false,
      createdAt: "2024-12-05T14:20:00Z",
      updatedAt: "2024-12-06T10:30:00Z",
      answers: [
        {
          id: "ans_001",
          content: "For JWT in Node.js, I recommend using the `jsonwebtoken` library. Best practices:\n1. Use short-lived access tokens (15-30 mins)\n2. Store refresh tokens in an HTTP-only cookie\n3. Implement token rotation\n4. Use Redis for blacklisting if needed\n\nExample code:\n```javascript\nconst jwt = require('jsonwebtoken');\nconst accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });\n```",
          user: {
            id: "202",
            firstName: "Prof.",
            lastName: "Davis",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Davis",
            role: "teacher",
            reputationScore: 2850
          },
          stats: {
            upvotes: 12,
            downvotes: 0,
            score: 12
          },
          isAccepted: true,
          acceptedAt: "2024-12-06T09:15:00Z",
          createdAt: "2024-12-05T16:45:00Z",
          updatedAt: "2024-12-05T16:45:00Z"
        },
        {
          id: "ans_002",
          content: "Consider using Passport.js middleware for easier integration. It supports JWT strategy out of the box.",
          user: {
            id: "128",
            firstName: "David",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            reputationScore: 890
          },
          stats: {
            upvotes: 5,
            downvotes: 1,
            score: 4
          },
          isAccepted: false,
          createdAt: "2024-12-06T08:20:00Z",
          updatedAt: "2024-12-06T08:20:00Z"
        }
      ]
    },
    meta: {},
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== EVENTS MOCKS ==========
console.log('📅 Creating events mocks...');

// GET /api/v1/events
fs.writeFileSync(
  path.join(mocksDir, 'events', 'list.json'),
  JSON.stringify({
    success: true,
    data: {
      events: [
        {
          id: "evt_001",
          title: "Annual Hackathon 2024",
          description: "24-hour coding competition with prizes totaling $10,000. Open to all students! Teams of up to 4 people. Food and drinks provided.",
          organizer: {
            id: "org_001",
            name: "Computer Science Club",
            avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CSClub"
          },
          category: "academic",
          eventType: "in_person",
          location: "Engineering Building, Room 301",
          locationLat: 40.7128,
          locationLng: -74.0060,
          startTime: "2024-12-15T09:00:00Z",
          endTime: "2024-12-16T09:00:00Z",
          timezone: "America/New_York",
          capacity: 100,
          registrationRequired: true,
          registrationDeadline: "2024-12-14T23:59:00Z",
          rsvpCount: 78,
          isFeatured: true,
          coverImageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
          isCancelled: false,
          createdAt: "2024-11-20T10:00:00Z"
        },
        {
          id: "evt_002",
          title: "Career Fair: Tech Companies",
          description: "Meet recruiters from Google, Microsoft, Amazon, and more! Bring multiple copies of your resume. Business casual attire recommended.",
          organizer: {
            id: "org_002",
            name: "Career Services",
            avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=Career"
          },
          category: "career",
          eventType: "in_person",
          location: "Student Union Ballroom",
          locationLat: 40.7130,
          locationLng: -74.0058,
          startTime: "2024-12-10T10:00:00Z",
          endTime: "2024-12-10T16:00:00Z",
          timezone: "America/New_York",
          capacity: 200,
          registrationRequired: false,
          rsvpCount: 145,
          isFeatured: true,
          isCancelled: false,
          createdAt: "2024-11-15T14:30:00Z"
        },
        {
          id: "evt_003",
          title: "AI & Machine Learning Workshop",
          description: "Hands-on workshop covering TensorFlow basics and building your first neural network. No prior experience required!",
          organizer: {
            id: "203",
            name: "Dr. Chen",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen",
            role: "teacher"
          },
          category: "workshop",
          eventType: "virtual",
          virtualLink: "https://zoom.us/j/123456789",
          virtualPlatform: "Zoom",
          startTime: "2024-12-12T18:00:00Z",
          endTime: "2024-12-12T20:00:00Z",
          timezone: "America/New_York",
          capacity: 50,
          registrationRequired: true,
          rsvpCount: 32,
          isFeatured: false,
          isCancelled: false,
          createdAt: "2024-12-01T11:20:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== MARKETPLACE MOCKS ==========
console.log('🛒 Creating marketplace mocks...');

// GET /api/v1/marketplace/listings
fs.writeFileSync(
  path.join(mocksDir, 'marketplace', 'listings.json'),
  JSON.stringify({
    success: true,
    data: {
      listings: [
        {
          id: "mkt_001",
          title: "Calculus Textbook - Like New",
          description: "Calculus: Early Transcendentals 8th Edition by James Stewart. Used for one semester, no highlights or writing. Perfect condition.",
          seller: {
            id: "123",
            firstName: "John",
            lastName: "Doe",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            rating: 4.8,
            reviewCount: 12
          },
          category: "textbooks",
          condition: "like_new",
          price: 45.00,
          currency: "USD",
          isNegotiable: true,
          location: "Campus East, Dorm A",
          locationLat: 40.7125,
          locationLng: -74.0062,
          images: [
            {
              url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
              thumbnailUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300"
            }
          ],
          status: "active",
          viewCount: 24,
          offerCount: 2,
          createdAt: "2024-12-05T14:30:00Z",
          expiresAt: "2025-02-05T14:30:00Z"
        },
        {
          id: "mkt_002",
          title: "MacBook Air M1 2020",
          description: "8GB RAM, 256GB SSD. Perfect condition, includes original charger and box. Battery health 92%. Selling because I upgraded to M2.",
          seller: {
            id: "128",
            firstName: "David",
            lastName: "Brown",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            rating: 4.9,
            reviewCount: 8
          },
          category: "electronics",
          condition: "good",
          price: 650.00,
          currency: "USD",
          isNegotiable: false,
          location: "Campus West, Apartment 302",
          locationLat: 40.7132,
          locationLng: -74.0055,
          images: [
            {
              url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
              thumbnailUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300"
            },
            {
              url: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f",
              thumbnailUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=300"
            }
          ],
          status: "active",
          viewCount: 56,
          offerCount: 5,
          createdAt: "2024-12-04T11:20:00Z",
          expiresAt: "2025-02-04T11:20:00Z"
        },
        {
          id: "mkt_003",
          title: "Bicycle - Mountain Bike",
          description: "Trek Marlin 5, size medium. Good condition, recently serviced. Comes with lock and helmet. Need to sell before winter break.",
          seller: {
            id: "126",
            firstName: "Sarah",
            lastName: "Williams",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            rating: 4.7,
            reviewCount: 5
          },
          category: "other",
          condition: "good",
          price: 200.00,
          currency: "USD",
          isNegotiable: true,
          location: "Campus South",
          locationLat: 40.7120,
          locationLng: -74.0065,
          images: [
            {
              url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
              thumbnailUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300"
            }
          ],
          status: "active",
          viewCount: 18,
          offerCount: 1,
          createdAt: "2024-12-06T16:45:00Z",
          expiresAt: "2025-02-06T16:45:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== RESOURCES MOCKS ==========
console.log('📚 Creating resources mocks...');

// GET /api/v1/resources
fs.writeFileSync(
  path.join(mocksDir, 'resources', 'list.json'),
  JSON.stringify({
    success: true,
    data: {
      resources: [
        {
          id: "res_001",
          name: "CS401 Final Project Guidelines.pdf",
          description: "Complete guidelines and rubric for the CS401 final project",
          uploader: {
            id: "201",
            firstName: "Dr.",
            lastName: "Smith",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Smith"
          },
          resourceType: "file",
          mimeType: "application/pdf",
          fileSizeBytes: 1524000,
          courseCode: "CS401",
          semester: "Fall 2024",
          category: "assignments",
          visibility: "university",
          downloadCount: 87,
          isVerified: true,
          createdAt: "2024-11-20T10:00:00Z"
        },
        {
          id: "res_002",
          name: "Biology Lab Report Template",
          description: "Standard template for all biology lab reports",
          uploader: {
            id: "202",
            firstName: "Prof.",
            lastName: "Davis",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Davis"
          },
          resourceType: "document",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          fileSizeBytes: 24500,
          courseCode: "BIO101",
          semester: "Fall 2024",
          category: "templates",
          visibility: "university",
          downloadCount: 142,
          isVerified: true,
          createdAt: "2024-09-05T14:30:00Z"
        },
        {
          id: "res_003",
          name: "Calculus II Practice Problems",
          description: "Collection of practice problems with solutions for Calculus II midterm",
          uploader: {
            id: "124",
            firstName: "Jane",
            lastName: "Smith",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
          },
          resourceType: "file",
          mimeType: "application/pdf",
          fileSizeBytes: 3120000,
          courseCode: "MATH202",
          semester: "Fall 2024",
          category: "exams",
          visibility: "university",
          downloadCount: 65,
          isVerified: false,
          createdAt: "2024-11-15T16:20:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: true
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== NOTIFICATIONS MOCKS ==========
console.log('🔔 Creating notifications mocks...');

// GET /api/v1/notifications
fs.writeFileSync(
  path.join(mocksDir, 'notifications', 'list.json'),
  JSON.stringify({
    success: true,
    data: {
      notifications: [
        {
          id: "notif_001",
          type: "post_reaction",
          title: "Jane Smith liked your post",
          content: "Jane Smith reacted to your post about the CS401 project",
          actor: {
            id: "124",
            firstName: "Jane",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
          },
          relatedEntity: {
            type: "post",
            id: "456",
            preview: "Just finished my final project for CS401! Built a full-stack React/Node.js application..."
          },
          actionUrl: "/posts/456",
          isRead: false,
          createdAt: "2024-12-07T10:25:00Z"
        },
        {
          id: "notif_002",
          type: "question_answer",
          title: "New answer to your question",
          content: "Alex Johnson posted an answer to your question about React hooks",
          actor: {
            id: "125",
            firstName: "Alex",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
          },
          relatedEntity: {
            type: "question",
            id: "q_002",
            preview: "Best resources for learning React hooks?"
          },
          actionUrl: "/qa/questions/q_002",
          isRead: true,
          createdAt: "2024-12-07T09:45:00Z"
        },
        {
          id: "notif_003",
          type: "event_reminder",
          title: "Hackathon starts tomorrow",
          content: "Annual Hackathon 2024 starts tomorrow at 9 AM",
          relatedEntity: {
            type: "event",
            id: "evt_001",
            preview: "24-hour coding competition with prizes totaling $10,000"
          },
          actionUrl: "/events/evt_001",
          isRead: false,
          createdAt: "2024-12-07T08:30:00Z"
        },
        {
          id: "notif_004",
          type: "new_follower",
          title: "Sarah Williams started following you",
          content: "Sarah Williams is now following you",
          actor: {
            id: "126",
            firstName: "Sarah",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
          },
          actionUrl: "/users/126",
          isRead: true,
          createdAt: "2024-12-06T22:15:00Z"
        },
        {
          id: "notif_005",
          type: "marketplace_offer",
          title: "New offer on your textbook",
          content: "Mike Brown offered $40 for your Calculus textbook",
          actor: {
            id: "127",
            firstName: "Mike",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
          },
          relatedEntity: {
            type: "marketplace_listing",
            id: "mkt_001",
            preview: "Calculus Textbook - Like New"
          },
          actionUrl: "/marketplace/listings/mkt_001",
          isRead: false,
          createdAt: "2024-12-06T20:45:00Z"
        }
      ],
      unreadCount: 3
    },
    meta: {
      page: 1,
      limit: 20,
      total: 5,
      hasMore: false
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== GROUPS MOCKS ==========
console.log('👥 Creating groups mocks...');

// GET /api/v1/groups
fs.writeFileSync(
  path.join(mocksDir, 'groups', 'list.json'),
  JSON.stringify({
    success: true,
    data: {
      groups: [
        {
          id: "grp_001",
          name: "Computer Science Club",
          slug: "cs-club",
          description: "Official club for computer science students. Weekly meetings, hackathons, and workshops.",
          avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CSClub",
          coverPhotoUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0",
          groupType: "club",
          privacyLevel: "public",
          category: "academic",
          memberCount: 156,
          postCount: 42,
          isVerified: true,
          isFeatured: true,
          createdAt: "2024-01-10T09:00:00Z"
        },
        {
          id: "grp_002",
          name: "CS401 Study Group",
          slug: "cs401-study",
          description: "Study group for CS401: Web Development. Share resources, ask questions, and collaborate.",
          avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CS401",
          groupType: "study",
          privacyLevel: "private",
          category: "academic",
          memberCount: 23,
          postCount: 18,
          isVerified: false,
          isFeatured: false,
          createdAt: "2024-09-15T14:30:00Z"
        },
        {
          id: "grp_003",
          name: "Campus Photography",
          slug: "campus-photography",
          description: "For photography enthusiasts on campus. Share photos, organize photo walks, and learn together.",
          avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=Photography",
          coverPhotoUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
          groupType: "social",
          privacyLevel: "public",
          category: "hobby",
          memberCount: 89,
          postCount: 127,
          isVerified: true,
          isFeatured: false,
          createdAt: "2024-03-20T11:15:00Z"
        }
      ]
    },
    meta: {
      page: 1,
      limit: 20,
      total: 3,
      hasMore: true
    },
    timestamp: "2024-12-07T10:30:00Z"
  }, null, 2)
);

// ========== ERROR RESPONSES ==========
console.log('❌ Creating error responses...');

// Error response template
const errorResponse = (code, message, details = []) => ({
  success: false,
  error: {
    code,
    message,
    details
  },
  timestamp: "2024-12-07T10:30:00Z"
});

// Validation error
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'error-validation.json'),
  JSON.stringify(errorResponse(
    "VALIDATION_ERROR",
    "Invalid input data",
    [
      { field: "email", message: "Email is required" },
      { field: "password", message: "Password must be at least 8 characters" }
    ]
  ), null, 2)
);

// Unauthorized error
fs.writeFileSync(
  path.join(mocksDir, 'auth', 'error-unauthorized.json'),
  JSON.stringify(errorResponse(
    "UNAUTHORIZED",
    "Authentication required",
    [{ message: "Please login to access this resource" }]
  ), null, 2)
);

// Not found error
fs.writeFileSync(
  path.join(mocksDir, 'users', 'error-not-found.json'),
  JSON.stringify(errorResponse(
    "NOT_FOUND",
    "User not found",
    [{ message: "The requested user does not exist" }]
  ), null, 2)
);

// Rate limit error
fs.writeFileSync(
  path.join(mocksDir, 'error-rate-limit.json'),
  JSON.stringify(errorResponse(
    "RATE_LIMIT_EXCEEDED",
    "Too many requests",
    [{ message: "Please try again in 1 hour" }]
  ), null, 2)
);

// ========== CREATE README ==========
console.log('\n📄 Creating README...');

fs.writeFileSync(
  path.join(baseDir, 'README.md'),
  `# Uni Hub Mock API

## 📁 Mock Data Structure

This directory contains mock JSON responses for all Uni Hub API endpoints.

### Directory Structure

\`\`\`
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
\`\`\`

### 🔧 Usage Examples

#### Frontend Development
\`\`\`javascript
// Base URL for GitHub Pages deployment
const API_BASE = 'https://username.github.io/uni-hub-swagger/mocks';

// Fetch user feed
fetch('\${API_BASE}/posts/feed.json')
  .then(res => res.json())
  .then(data => console.log(data));

// Fetch user profile
fetch('\${API_BASE}/users/123.json')
  .then(res => res.json())
  .then(data => console.log(data));
\`\`\`

#### Available Endpoints

| Endpoint | Mock File | Method |
|----------|-----------|---------|
| \`/api/v1/auth/login\` | \`auth/login.json\` | POST |
| \`/api/v1/users/{id}\` | \`users/123.json\` | GET |
| \`/api/v1/users/search\` | \`users/search.json\` | GET |
| \`/api/v1/posts/feed\` | \`posts/feed.json\` | GET |
| \`/api/v1/posts/{id}\` | \`posts/456.json\` | GET |
| \`/api/v1/messages/conversations\` | \`messages/conversations.json\` | GET |
| \`/api/v1/qa/questions\` | \`qa/questions.json\` | GET |
| \`/api/v1/events\` | \`events/list.json\` | GET |
| \`/api/v1/marketplace/listings\` | \`marketplace/listings.json\` | GET |
| \`/api/v1/notifications\` | \`notifications/list.json\` | GET |
| \`/api/v1/groups\` | \`groups/list.json\` | GET |

### 📦 Response Format

All responses follow this format:
\`\`\`json
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
\`\`\`

### 🚀 Deployment

1. Run the setup script:
   \`\`\`bash
   node create-mocks.js
   \`\`\`

2. Push to GitHub Pages:
   \`\`\`bash
   git add .
   git commit -m "Add mock API files"
   git push origin gh-pages
   \`\`\`

### 📝 Notes

- All dates are in ISO 8601 format (UTC)
- Images use Unsplash and DiceBear for consistency
- IDs are strings for consistency with UUID format
- Error responses follow the same structure with \`success: false\`

### 🔄 Regenerating Mocks

To regenerate all mock files:
\`\`\`bash
rm -rf mocks/
node create-mocks.js
\`\`\`

---
*Last updated: ${new Date().toISOString().split('T')[0]}*
`
);

// ========== CREATE PACKAGE.JSON ==========
console.log('📦 Creating package.json...');

fs.writeFileSync(
  path.join(baseDir, 'package.json'),
  JSON.stringify({
    name: "uni-hub-mock-api",
    version: "1.0.0",
    description: "Mock API for Uni Hub Platform",
    main: "create-mocks.js",
    scripts: {
      "create-mocks": "node create-mocks.js",
      "clean": "rm -rf mocks/",
      "regenerate": "npm run clean && npm run create-mocks",
      "serve": "npx serve . -p 8080"
    },
    keywords: ["mock-api", "swagger", "openapi", "university", "student-platform"],
    author: "Uni Hub Team",
    license: "MIT",
    "dependencies": {},
    "devDependencies": {}
  }, null, 2)
);

console.log('\n✅ Mock API creation complete!');
console.log('\n📊 Created:');
console.log(`   • ${subDirs.length} directories in /mocks/`);
console.log(`   • 25+ mock JSON files`);
console.log(`   • README.md with usage instructions`);
console.log(`   • package.json with scripts`);
console.log('\n🚀 Next steps:');
console.log('   1. Run: npm run serve (to test locally)');
console.log('   2. Push to GitHub Pages for deployment');
console.log('   3. Use in frontend: fetch("/mocks/posts/feed.json")');
console.log('\n📚 Documentation available in README.md');