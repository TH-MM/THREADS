import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContext from './Context/userContext.jsx'
import PostContext from './Context/postContext.jsx'
import { VisitPages } from './Context/visitedPagesContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VisitPages>
    <UserContext>
      <PostContext>
      <App />
      </PostContext>
    </UserContext>
    </VisitPages>
  </StrictMode>,
)
