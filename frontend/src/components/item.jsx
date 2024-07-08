function Item({item}) {
    return (
        <div className="row">
            <input type="checkbox" />
            <span>{item.text}</span>
            <button>Apagar</button>
        </div>
    )

}

export default Item