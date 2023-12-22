import { useParams } from "react-router-dom";

function Post() {
    const { id } = useParams()
    // Use the id to fetch post data

    return <div>Post details for post ID: {id}</div>;
}

export default Post;
