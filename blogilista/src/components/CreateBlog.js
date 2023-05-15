import { useState } from "react"


const CreateBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()
        createBlog(title, author, url)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                title: <input
                    type="text"
                    name="Title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author: <input
                    type="text"
                    name="Author"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url: <input
                    type="text"
                    name="Url"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default CreateBlogForm