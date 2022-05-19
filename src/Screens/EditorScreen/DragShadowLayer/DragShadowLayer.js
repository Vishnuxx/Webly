import {useRecoilValue} from 'recoil'
import { dragShadowPositionState } from '../../../State/EditorState'

export function DragShadowLayer(props) {
    

    return <div style={{width:"100vw" , height: "100vh" , position:"absolute" , top:"0"  ,padding:"0" , pointerEvents:"none"}}>
       <DragShadow/>
    </div>
}

function DragShadow(props) {
     const location = useRecoilValue(dragShadowPositionState);
     console.log(document.elementFromPoint(location.x , location.y))
    return <div style={{position:"absolute" , background:"green" , width:"200px" , height:"30px" , top:location.y , left:location.x , display:(location.isVisible? "block" : "none")}}></div>
}