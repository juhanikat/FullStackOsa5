const CreateBlogForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                title: <input
                    type="text"
                    name="Title"
                    value={props.title}
                    onChange={({ target }) => props.setTitle(target.value)}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    name="Author"
                    value={props.author}
                    onChange={({ target }) => props.setAuthor(target.value)}
                />
            </div>
            <div>
                url: <input
                    type="text"
                    name="Url"
                    value={props.url}
                    onChange={({ target }) => props.setUrl(target.value)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default CreateBlogForm