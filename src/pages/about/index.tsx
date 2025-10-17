import { Outlet } from 'react-router'

const About = () => {
  return (
    <div>
      <p>about</p>
      <div className="h-[200px] w-[300px] bg-blue-200">
        <Outlet />
      </div>
    </div>
  )
}
export default About
