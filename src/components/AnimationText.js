import { useEffect, useState } from 'react'
import '../css/AnimationText.css'

const AnimationText = ({text}) => {
  const [animationClass, setAnimationClass] = useState('')
  
  const getSpans = (text) => {
    const spans = []
    let s = 0.00
    let style = {}
    for (let i=0; i<text.length; i++){
        let letter = text[i] 
        s += 0.025
        style = {
          animationDelay: s+"s"        };
        spans.push(<span key={i} className={"char char-"+i} style={style}>{letter}</span>)
    }

    return spans
  }

  useEffect(() => {   
    setAnimationClass('is-animated')
  },[])

  return (
    <div className={animationClass} >
      <div data-animate="slide-in">
        {getSpans(text)}
      </div>
    </div>
  );
}

export default AnimationText;
