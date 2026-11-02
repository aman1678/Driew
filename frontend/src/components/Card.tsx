interface DramaProp {
    drama: string;
}

function Card({ drama }: DramaProp) {

    return(
        <a href={`http://127.0.0.1:5000/api/posts/${drama}`}>
            <div className="card">
                <h3>{drama}</h3>
            </div>
        </a>
    );
}

export default Card;