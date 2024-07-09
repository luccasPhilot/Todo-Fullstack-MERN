import { useState } from "react"

function Item({ item, updateDocuments, deleteDocuments }) {
    const [tempText, setTempText] = useState("")
    return (
        <div className="row">
            <input type="checkbox" checked={!item.active} onClick={() => { updateDocuments({ ...item, active: !item.active }) }} />

            {(item.edit) || (item.text === "") ? (
                <input type="text" placeholder={item.text} onChange={(e) => { setTempText(e.target.value) }} onBlur={() => updateDocuments({ ...item, text: tempText, edit: false })} />
            )
                :
                <span onClick={() => { updateDocuments({ ...item, edit: true }) }} style={(item.active) ? {} : { textDecoration: "line-through" }}>{item.text}</span>
            }

            <button className="button-to-do" onClick={() => { deleteDocuments(item) }}>Apagar</button>
        </div>
    )

}

export default Item