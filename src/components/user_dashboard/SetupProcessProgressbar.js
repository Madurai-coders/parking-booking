import React,{useState,useEffect} from "react";
import "../../assets/css/user_dashboard/progressbar.css"
import PakingSlot from "../../assets/images/pakingSlot.svg"
import CarInfo from "../../assets/images/carinfo.svg"
import Plan from "../../assets/images/plan.svg"
import Payment from "../../assets/images/payment.svg"
import tick from "../../assets/images/tick 1.svg"

export default function SetupProcess(props) {
  const[step, stepNumber] = useState(props.number);

  useEffect(() => {
    stepNumber(props.number)
  }, [props.number])
  

  return (
    <>
      <div className="" >
        {/* <div className="setupprocess pt-3 ps-5 pb-2">4-<span className={'text-dark h4'}>Step Booking </span></div> */}
        {/* <div className="setupprocesssub ps-5 pb-3">In order to use the service you have to complete the setup process</div> */}
        <ul className="step-wizard-list">
            <li className="step-wizard-item">
                <span className={"progress-count "+((step>=1) ? 'step1img' : '')}><img src={(step>1)? tick:PakingSlot} className={((step==1) ? 'white' : '')} /></span>
                <span className={"progress-label "+((step>=1) ? 'step1txt' : '')}>Slot selection</span>
                {/* <span className={"progress-label "+((step>=1) ? 'step1txt text-dark h6' : '')}>{props.slot !=undefined && props.slot}</span> */}
            </li>
            <li className={"step-wizard-item "+((step==1) ? 'step1bar' : '')+((step>1) ? 'step2prevbar' : '')}>
                <span className={"progress-count "+((step>=2) ? 'step2img' : '')}><img src={(step==3)? tick:CarInfo} className={((step==2) ? 'white' : '')}/></span>
                <span className={"progress-label "+((step>=2) ? 'step2txt' : '')}>Car info</span>
            </li>
            <li className={"step-wizard-item "+((step==2) ? 'step2bar' : '')+((step==3) ? 'step3bar' : '')}>
                <span className={"progress-count "+((step==3) ? 'step3img' : '')}><img src={Plan} className={((step==3) ? 'white' : '')}/></span>
                <span className={"progress-label "+((step==3) ? 'step3txt' : '')}>Plan</span>
            </li>

            <li className={"step-wizard-item "+((step==3) ? 'step2bar' : '')+((step==4) ? 'step3bar' : '')}>
                <span className={"progress-count "+((step==4) ? 'step3img' : '')}><img src={Payment} className={((step==4) ? 'white' : '')}/></span>
                <span className={"progress-label "+((step==4) ? 'step3txt' : '')}>Payment</span>
            </li>
        </ul>
    </div>
    </>
  );
}
