import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import './create-modal.css';

interface InputProps{
    label:string,
    value:string | number,
    updateValue(value: unknown):void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}/>
        </>
    )
}

export function CreateModal({closeModal}: ModalProps){

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        const foodData:FoodData = {
            price,
            image,
            title
        }
        mutate(foodData);
    }
 
    useEffect(() => {
        if (!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastro de Item</h2>
                <form className="input-container" action="">
                    <Input label="title" value={title} updateValue={setTitle}></Input>
                    <Input label="price" value={price} updateValue={setPrice}></Input>  
                    <Input label="image" value={image} updateValue={setImage}></Input>
                </form>
                <button className="btn-secondary" onClick={submit}>
                    {isLoading? 'POSTANDO...' : 'POSTAR'}
                </button>
            </div>
        </div>
    )
}