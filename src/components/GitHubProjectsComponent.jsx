import { useEffect, useState } from "react";
import { githubProjects } from "../assets/githubprojects";
import { motion, AnimatePresence } from "framer-motion";

const GitHubProjectsComponent = () => {
  // const specificRepos = [
  //   "reactspeech",
  //   "BackEndProjectWebappTS",
  //   "ASPNET_Assignment_DG",
  //   "CMS_Assignment_DG",
  // ];

  const [projects, setProjects] = useState(githubProjects);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(selectedProjectId === projectId ? null : projectId);
  };


  return (
    <>
      <ul className="gh-list">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                handleProjectClick(project.id);
              }}
            >
              {project.name}
            </a>
            <AnimatePresence>
              {selectedProjectId === project.id && (
                <motion.div
                  className="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  {project.description}
                  <a
                    className="ghBtn"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </>
  );
};
export default GitHubProjectsComponent;
