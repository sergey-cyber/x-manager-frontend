import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { ProjectPage } from "./components/ProjectPage/ProjectPage";
import { Projects } from "./components/projects/Projects";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/projects" replace />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:projectId" element={<ProjectPage />} />
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
