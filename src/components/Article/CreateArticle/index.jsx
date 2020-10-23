import React from "react";
import Banner from "../../Banner";
import {Link} from "react-router-dom";
import CreateArticleFrom from "./CreateArticleForm";
import config from '../../../config'
import Axios from "axios";
import loadingGif from '../../../gifs/loading.svg';
const {validateAll} = window;

export default class CreatArticle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            name: '',
            image: null,
            category: null,
            categories: null,
            errors: {},
            loading: false
        }
    }

    async componentDidMount() {
        const response = await Axios.get(`${config.apiUrl}/category`);
        this.setState({
            categories: response.data
        });
    }

    handleChange = (event) => {
        if (event.target.name !== 'category') {
            this.setState({
                [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value
            })
        } else{
            let id;
            this.state.categories.forEach((category) =>{
                if (category.name === event.target.value){
                    id = category.id;
                }
            })
            this.setState({
                category:{
                    name: event.target.value,
                    id
                }
            })
        }
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const data = this.state;

        const rules = {
            name: 'required|min:3|string',
            image: 'required',
            content: 'required|min:10|string',
            category: 'required'
        }

        const message = {
            required: 'The {{ field }} is required.',
            "name.min": 'The name must be at least 3 characters.',
            "content.min": 'The content must be at least 10 characters.',
        }

        validateAll(data, rules, message)
            .then(async () => {
                const form = new FormData();
                form.append('file', data.image);
                form.append('upload_preset', 'mPreset');
                const imageResponse = await Axios.post(`${config.imageUploadUrl}`, form);
                await Axios.post(`${config.apiUrl}/category/${data.category.id}/article`,{
                    name: data.name,
                    content: data.content,
                    image: imageResponse.data.secure_url,
                    category: data.category,
                    date: new Date().toDateString()
                });
                this.setState({loading: false});
                this.props.history.push('/');

            })
            .catch((errors) => {
                const formattedErrors = {}
                errors.forEach(error => {
                    formattedErrors[error.field] = error.message
                });
                this.setState({
                    errors: formattedErrors,
                    loading: false
                })
            })
    }

    render() {
        return (
            <CreateArticleFrom
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                categories={this.state.categories}
                errors={this.state.errors}
                loadingGif={this.state.loading?loadingGif:null}
            />
        );
    }
}
