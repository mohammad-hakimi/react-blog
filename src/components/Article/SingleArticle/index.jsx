import React from "react";
import SingleArticleContainer from "./SingleArticleContainer";
import Axios from "axios";
import config from "../../../config"

class SingleArticle extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            article: null
        }

    }

    async componentDidMount() {
        const article = await Axios.get(`${config.apiUrl}/category/${this.props.match.params.cSlug}/article/${this.props.match.params.slug}`);
        this.setState( { article: article.data });

    }

    render() {
        return (
            this.state.article &&
            <SingleArticleContainer article={this.state.article}/>
        );
    }
}

export default SingleArticle;