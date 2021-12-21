
import loader_video from "../assets/images/loader.mp4";

export default function Loader() {
 
  return (

<div style={{height:"100vh"}} className="bg-light">
<video width="220" height="140" className="overlay bg-light"  autoPlay muted>
<source src={loader_video} type="video/mp4"/>
</video>
</div>

  );
}
