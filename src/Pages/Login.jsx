import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Switch } from 'antd';
import login from "../assets/images/login.png"
const Login = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <section className="bg-[#eee]">
      <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 min-h-screen" style={{ gridTemplateColumns: '60% 40%' }}>
        <div className="bg-[#eee] p-4">
          <nav className="flex w-full justify-between">
            <h1>EmoSense</h1>
            <h1>Don't have account? Sign up!</h1>
          </nav>
          <section className="lg:mt-[50px]">
            <h1 className="font-bold text-3xl text-center">Welcome Back</h1>
            <h3 className="mt-3 text-center">Login into your account</h3><br></br>
            <div className="flex text-center items-center justify-center">
              <div className="flex text-center items-center justify-center border border-gray-300 bg-[white] px-8 py-2 rounded-md hover:cursor-pointer"><FcGoogle className="text-3xl" /> &nbsp;Google </div>
              <div className="flex text-center items-center justify-center border border-gray-300 bg-[white] ml-4 px-8 py-2 rounded-md hover:cursor-pointer"><BsFacebook className="text-3xl" /> &nbsp;Facebook </div>
            </div><br></br>
            <div className='flex items-center justify-center'>
              <hr className='w-[170px] bg-[#4a4a4a] h-[1px] border-none'></hr><h1 className='px-2 text-center text-black'>OR Continue with</h1><hr className='w-[170px] bg-[#4a4a4a] h-[1px] border-none'></hr>
            </div><br></br>
          </section>


          <form className="max-w-sm mx-auto">
            <div className="mb-5">
              <input type="email" id="email" className="bg-white p-4 border border-gray-600 w-full rounded-md outline-none" placeholder="Email" required />
            </div>
            <div className="mb-5">
              <input type="password" id="password" className="bg-white p-4 border border-gray-600 w-full rounded-md outline-none" placeholder="Password" required />
            </div>
            <div className="flex w-full justify-between mb-5">
              <div className="flex items-center">
                <Switch defaultChecked className="bg-[#4a4a4a]" onChange={onChange} /><p className="ml-2">Remember Me</p></div>
              <div>Recover Password</div>

            </div>
            <button type="submit" className="border border-gray-600 rounded-md w-full px-8 py-2">Login</button>
          </form>

        </div>
        <div className="relative">
          <img src={login} alt="login" className="w-full min-h-screen max-h-screen object-cover" />
          <div className="flex items-center justify-center w-full rounded-lg">
            <div className="absolute bottom-12 p-4 grid items-center justify-center w-[80%] bg-white bg-opacity-10  backdrop-filter backdrop-blur-lg rounded-lg">
              <div className="bg-green-500 p-4 text-white rounded-lg">
                Unleash the power of emotions with EmoSense. Sign up to experience personalized emotion detection technology. Your feelings, your story — let EmoSense be your guide. Join us on this exciting journey today!
              </div>
            </div>
          </div>
        </div>


      </div>

    </section>
  );
}

export default Login;