# Project Mate

Project Mate is an AI-powered GitHub development tool that enhances team collaboration and code understanding through intelligent analysis and project management features.

![Project Mate](public/favicon.ico)

## 🚀 Features

### 🔍 GitHub Repository Integration
- Seamless connection to public and private repositories
- Automatic commit tracking and analysis
- Comprehensive file indexing and code understanding
- GitHub token support for private repository access

### 🤖 AI-Powered Analysis
- Intelligent code summarization
- Semantic search using code embeddings
- Detailed commit analysis and summaries
- AI-assisted project onboarding

### 👥 Team Collaboration
- Multi-user project access
- Team member management
- Streamlined invite system
- Meeting management and recording capabilities

### 💳 Smart Credit System
- Pay-per-use model based on file count
- 1 credit = 1 file indexing
- Flexible credit purchase options via Stripe
- Real-time credit balance tracking

### 🎙️ Meeting Features
- Audio meeting recording and storage
- Automatic meeting transcription
- Integrated issue tracking
- Comprehensive meeting history

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Clerk](https://clerk.dev) - Authentication
- [tRPC](https://trpc.io) - Type-safe API calls

### Backend
- Node.js
- [Prisma](https://prisma.io) - Database ORM
- AI Integration (Gemini and OpenAI)
- [Stripe](https://stripe.com) - Payment processing

## 🏃‍♂️ Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/project-mate.git
cd project-mate
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure your environment variables:
- Clerk authentication keys
- Stripe API keys
- Database URL
- AI API keys (Gemini/OpenAI)

5. Run the development server
```bash
npm run dev
```

## 🌟 Key Workflows

### Project Creation
1. Connect your GitHub repository
2. System analyzes required credits
3. Repository indexing and analysis
4. Automatic commit tracking

### Dashboard Features
- Repository information display
- Team collaboration tools
- Quick feature access
- Commit history and analysis

### Billing Management
- Stripe-powered credit purchase
- Flexible credit selection
- Transaction tracking
- Usage monitoring

## 🔐 Security

- Secure authentication via Clerk
- Protected API endpoints
- Safe credential handling
- Role-based access control

## 📝 License

[MIT](LICENSE)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/project-mate/issues).

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- Built with [T3 Stack](https://create.t3.gg/)
- Powered by Next.js and React
- AI capabilities by Gemini and OpenAI
