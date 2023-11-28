import Konva from 'konva'
import { useEffect, useState, useRef } from 'react'
import { Stage, Layer, Transformer } from 'react-konva'
import './App.css'

function App() {
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const layerRef = useRef<Konva.Layer>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (!selectedElement) return;
        trRef.current?.nodes([selectedElement]);
        trRef.current?.getLayer()?.batchDraw();
    }, [selectedElement]);

    const addElement = () => {
        let newElement = new Konva.Rect({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            fill: 'green',
            draggable: true,
        });        
        layerRef.current?.add(newElement).batchDraw();
        let newElements = [...elements, newElement];
        setElements(newElements);
    }

    const removeElement = () => {
        if (elements.length === 0) return;
        let element = elements[elements.length - 1];
        let newElements = [...elements];
        element.remove();
        newElements.pop();
        setElements(newElements);
    }

    const clearElements = () => {
        layerRef.current?.destroyChildren();
        setElements([]);
    }

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.target === e.target.getStage()) {
            setSelectedElement(null);
            return;
        }
        setSelectedElement(e.target);
    }

    const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (e.target === e.target.getStage()) {
            setSelectedElement(null);
            return;
        }
        setSelectedElement(e.target);
    }

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
        if (!selectedElement) return;
        // let newElements = [...elements];
        // let element = newElements[newElements.length - 1];
        // element.x(e.target.x());
        // element.y(e.target.y());
        // setElements(newElements);
    }

    return (
		<div>
			<button onClick={addElement}>Add</button>
			<button onClick={removeElement}>Remove</button>
			<button onClick={clearElements}>Clear</button>
			<div style={{ border: "1px solid black" }}>
				<Stage
					width={1280}
					height={720}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onMouseMove={handleMouseMove}
				>
					<Layer ref={layerRef}>
						{selectedElement && <Transformer ref={trRef} />}
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default App
