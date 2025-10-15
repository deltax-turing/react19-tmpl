import { Outlet } from 'react-router'

const About = () => {
  return (
    <div>
      <p>about</p>
      <div className="w-[300px] h-[200px] bg-blue-200">
        <Outlet />
      </div>
    </div>
  )
}
export default About
