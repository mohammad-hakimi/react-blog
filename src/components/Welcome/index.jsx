import React from "react";
import Banner from "../Banner";
import Article from "../Article";
import Articles from "./Articles";
import config from "../../config";
import Axios from "axios";

class Welcome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            pageNumber: 1,
            loading: true
        }
    }

    handlePagination = (event) => {
        const pageNumber = this.state.pageNumber;
        this.setState({pageNumber: event.target.name === 'next' ? pageNumber + 1 : pageNumber - 1})
        console.log(event.target.name);
    }


    async componentWillMount() {
        let articles = [];
        for (let i = 1; i <= 10; i++) {
            const response = await Axios.get(`${config.apiUrl}/category/${i}/article`);
            console.log(response.data);
            articles = articles.concat(response.data);
        }
        console.log(articles);
        this.setState({articles, loading: false});

    }


    render() {
        return (
            <Articles
                handlePagination={this.handlePagination}
                articles={this.state.articles}
                pageNumber={this.state.pageNumber}
                loading={this.state.loading}
            />
        );
    }


}

export default Welcome;