import { Suspense } from 'react'
import CharacterList from './components/CharacterList'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div className="loading-app">Loading...</div>}>
        <main>
          <CharacterList />
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
