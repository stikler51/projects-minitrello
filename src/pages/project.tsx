import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PROJECTS } from '../mocks'
import { ProjectsDataType } from '../mocks/types'

const Project = (): ReactElement => {
  const [projectData, setProjectData] = useState<ProjectsDataType>([])

  const { id } = useParams<any>()

  useEffect(() => {
    // Case for real API

    // fetch('https://url_to_api/projects/${id}')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProjectData(data)
    //   })

    setTimeout(() => {
      const projectData: ProjectsDataType = PROJECTS.filter((project) => project.id == id)
      setProjectData(projectData)
    }, 1500)
  }, [])

  return (
    <div>
      <h1>Project Page: {id}</h1>
      {projectData.length ? (
        <div>
          <div>
            <strong>Project ID: </strong>
            <span>{projectData[0].id}</span>
          </div>
          <div>
            <strong>Project Name: </strong>
            <span>{projectData[0].project_name}</span>
          </div>
          <div>
            <strong>Project Manager: </strong>
            <span>
              {projectData[0].project_manager.first_name} {projectData[0].project_manager.last_name} (
              {projectData[0].project_manager.id})
            </span>
          </div>
          <div>
            <strong>Sales Manager: </strong>
            <span>
              {projectData[0].sales_manager.first_name} {projectData[0].sales_manager.last_name} (
              {projectData[0].sales_manager.id})
            </span>
          </div>
          <div>
            <strong>Customer: </strong>
            <span>
              {projectData[0].customer.name} ({projectData[0].customer.id})
            </span>
          </div>
          <div>
            <strong>Assigns: </strong>
            {projectData[0].assigns.map((assign) => (
              <p key={assign.id}>
                {assign.first_name} {assign.last_name} ({assign.id})
              </p>
            ))}
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  )
}

export default Project
