import Banner from "../../Banner";
import Article from "../../Article";
import React from "react";
import {Link} from "react-router-dom";


const Articles = ({handlePagination, articles, pageNumber, loading}) => {
    return (
        <div>
            <Banner
                backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-gift.jpg)`}
                title="Latest Blog Posts"
                subtitle="Read and get updated on how we progress."/>
            <main className="main-content bg-gray">
                {
                    loading ? <h1>Loading...</h1> :
                        <div className="row">
                            <div className="col-12 col-lg-6 offset-lg-3">
                                {
                                    articles && articles.map((article, index) => {
                                        if ((pageNumber - 1) * 5 <= index && index < pageNumber * 5) {
                                            console.log(index);
                                            return (
                                                <div key={article.slug}>
                                                    <Article article={article}/>
                                                    <hr/>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                }
                                <nav className="flexbox mt-50 mb-50">
                                    <button className="btn btn-white" disabled={pageNumber === 1} name='previous'
                                            onClick={handlePagination}>
                                        <i className="ti-arrow-left fs-9 ml-4"/> Previous
                                    </button>
                                    <button className="btn btn-white" disabled={articles.length <= pageNumber * 5} name='next' onClick={handlePagination}>
                                        <i className="ti-arrow-right fs-9 ml-4"/> Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                }
            </main>
        </div>
    );
}
export default Articles;