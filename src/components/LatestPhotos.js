import React, { Component } from 'react';
import Axios from 'axios';

class LatestPhotos extends Component {

    state= {
        photos:[],
        page:1,
        loading:true,
        searching: false,
        search_query: ''
    }

    componentDidMount(){
        Axios.get('https://api.unsplash.com/photos/?client_id=80ac6277544847ba9ba197bd9f6d07bcebaf41b9eb90ee72865082f3f113b0fe&per_page=16&page='+ this.state.page).then(
            res =>this.setState({
                photos:res.data,
                loading:false,
                page: this.state.page + 1
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    loadNextPage= (e) => {

        Axios.get('https://api.unsplash.com/photos/?client_id=80ac6277544847ba9ba197bd9f6d07bcebaf41b9eb90ee72865082f3f113b0fe&per_page=16&page='+ this.state.page).then(
            res =>this.setState({
                photos:res.data,
                loading:false,
                page: this.state.page + 1
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    searchQuary=(e)=>{
        this.setState({
            search_query:e.target.value
        })
    }

    searchTrigger=(e)=>{
        this.setState({
            loading:true
        })
        
        Axios.get('https://api.unsplash.com/search/photos/?client_id=80ac6277544847ba9ba197bd9f6d07bcebaf41b9eb90ee72865082f3f113b0fe&query=' + this.state.search_query + '&per_page=16&page='+ this.state.page).then(
            res => this.setState({
                photos: res.data.results,
                loading: false,
                page: 1,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        )
        e.preventDefault();
    }

    loadNextSearchPage =(e)=>{
        this.setState({
            loading:true
        })

        Axios.get('https://api.unsplash.com/search/photos/?client_id=80ac6277544847ba9ba197bd9f6d07bcebaf41b9eb90ee72865082f3f113b0fe&query=' + this.state.search_query + '&per_page=16&page='+ this.state.page).then(
            res => this.setState({
                photos: res.data.results,
                loading: false,
                page: this.state.page + 1,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    render() {

        var searchHeadin ='';
        var searchBtnMarkup ='';
        var searchInfo ='';

        if(this.state.searching === true){
            searchHeadin = <h2>You Search With <i>{this.state.search_query}</i> </h2>
            if(this.state.total_found_pages <= this.state.page){
                searchBtnMarkup =''
            }else{
                searchBtnMarkup = <button className="btn btn-success" onClick={this.loadNextSearchPage}>load Page {this.state.page + 1}</button>
            }

            searchInfo = <span>Total Found {this.state.total_found} | Page {this.state.page} of {this.state.total_found_pages}</span>
        }else{
         searchHeadin = <h2>Latest Photos</h2>
         searchBtnMarkup = <button className="btn btn-success" onClick={this.loadNextPage}>Load Page {this.state.page}</button>
        }

            if(this.state.loading === true){
                return(
                    <div className="col text-center"><h4>Loading ....</h4></div>            
                )
            }

        return(
            <React.Fragment>

                <div className="row top-heading">
                    <div className="col my-auto">
                    {searchHeadin}{searchInfo}
                    </div>
                    <div className="col col-auto my-auto">
                           <form action="" onSubmit={this.searchTrigger}>
                               <input value={this.state.search_query} onChange={this.searchQuary} type="text" placeholder="search keyword"/>
                               <input type="submit" value="Search"/>
                           </form>
                    </div>
                </div>

            <div className="row">

            {
                    this.state.photos.map((photo) => (
                        <div key={photo.id} className="col-lg-3">
                            <div className="single-photo-item">
                                <a className="d-block" href={'photo?id=' + photo.id}>
                                    <div className="photo-wrapper">
                                        <img src={photo.urls.small} alt={photo.description}/>
                                    </div>
                                    <h4>{photo.description}</h4>
                                    <p className="cat-name">by - {photo.user.first_name} {photo.user.last_name}</p>
                                </a>
                            </div>
                        </div>
                    ))
                }
                </div>

                <div className="col-lg-12 text-center">
                    <div className="load-more-btn">
                        {searchBtnMarkup}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LatestPhotos;