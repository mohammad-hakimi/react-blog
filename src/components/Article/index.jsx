import React from "react";
import {Link} from "react-router-dom";


const Article = ({ article }) => {
    return (
        <article className="mt-90">
            <header className="text-center mb-40">
                <h3>
                    <Link to={`category/${article.category.id}/article/${article.slug}`}>{article.name}</Link>
                </h3>
                <div className="link-color-default fs-12">
                    <Link to="#">{article.category.name}</Link>,
                    <time>{article.date}</time>
                </div>
            </header>
            <Link to={`category/${article.category.id}/article/${article.slug}`}>
                <img className="rounded" src={article.image} alt="..." />
            </Link>
            <div className="card-block">
                <p className="text-justify">{`${article.content.substring(0, 80)} ...`}</p>
                <p className="text-center mt-40">
                    <Link className="btn btn-primary btn-round" to={`category/${article.category.id}/article/${article.slug}`}>Read more</Link>
                </p>
            </div>
        </article>

    );
}

export default Article;