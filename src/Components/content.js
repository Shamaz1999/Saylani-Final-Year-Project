import React, { Component } from 'react';
import "./../bootstrap/bootstrapC.css"
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Skeleton from 'react-loading-skeleton'

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ads: "",
            showingSearched: false,
            isDataLoaded: false
        }
    }
    componentDidMount() {

        var option = {
            method: 'POST',
            body: '',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('/allads', option)
            .then(res => res.json())
            .then(data => {
                this.setState({ ads: data });
                this.setState({ isDataLoaded: true });
            })
            .catch(err => console.log(err))

    }

    allAds = () => {
        localStorage.removeItem('sa')
        this.setState({ showingSearched: false })
    }

    render() {

        window.scrollTo(0, 0);
        let skeletonCards = [1, 2, 3, 4, 5, 6, 7, 8];
        let d;
        let e;
        let sc;

        let searchedAds = JSON.parse(localStorage.getItem('sa'));
        const handleOnDragStart = e => e.preventDefault();

        const items = (data) => {
            return data.map((url, index) => {
                return (<div key={Math.random()}>
                    <img height='200' src={url} onDragStart={handleOnDragStart} alt="Ad-Pics" />
                </div>)
            })
        }

        let im = {
            margin: "20px 0",
        }
        if (this.state.ads.length !== 0) {
            for (let i = 0; i <= this.state.ads.length; i++) {
                let adId;
                d = this.state.ads.map((item, index) =>
                    <div key={Math.random()} className="card-wrapper" >
                        <div className="card" style={im} >
                            <AliceCarousel buttonsDisabled={true} duration={400} autoPlay={true} autoPlayInterval={5000} mouseDragEnabled >
                                {items([item.url1, item.url2, item.url3, item.url4])}
                            </AliceCarousel>
                            <div className="card-body">
                                <h5 className="card-title text-left">{this.state.ads[index].adTitle}</h5><h5 className="card-title text-left">Price: {this.state.ads[index].price}</h5>
                                <div className="divider"><hr className="ad-hr" /></div>
                                <div className="text-left">Ad Id : {adId = this.state.ads[index]._id}</div>
                                <div className="card-text text-left ad-description">{this.state.ads[index].description}</div>
                                <div className="d-flex space-btw align-center ads-btn-container">
                                    <span className="float-left" style={{ fontSize: '13px', color: 'grey' }}>{this.state.ads[index].location}</span>
                                    <span style={{ fontSize: '13px', color: 'grey' }}>
                                        {this.state.ads[index].date}
                                    </span>
                                </div>
                                <div style={{ textAlign: 'left', marginTop: ' 10px' }}>
                                    <Link to={"/ad/" + adId} className="btn login-btn open-ad-btn postAd-submit-btn" style={{ marginTop: "0px" }}>Open Ad</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        } else {
            d = <h2 className="message" >Sorry no ads have been posted yet!</h2>
        }


        // Searched Ads

        if (searchedAds !== null) {

            if (searchedAds.length !== 0) {
                for (let i = 0; i <= searchedAds.length; i++) {
                    e = searchedAds.map((item, index) =>
                        <div key={Math.random()} className="card-wrapper " >
                            <div className="card card-background-color" style={im} >
                                <AliceCarousel
                                    buttonsDisabled={true} duration={400} autoPlay={true} autoPlayInterval={5000} mouseDragEnabled >
                                    {items([item.url1, item.url2, item.url3, item.url4])}
                                </AliceCarousel>
                                <div className="card-body">
                                    <h5 className="card-title text-left">{item.adTitle}</h5><h5 className="card-title text-left">Price: {item.price}</h5>
                                    <div className="divider"><hr className="ad-hr" /></div>
                                    <div className="text-left">Ad Id : {item._id}</div>
                                    <div className="card-text text-left ad-description">{item.description}</div>
                                    <div className="d-flex space-btw align-center ads-btn-container">
                                        <span className="float-left" style={{ fontSize: '13px', color: 'grey' }}>{item.location}</span>
                                        <span style={{ fontSize: '13px', color: 'grey' }}>
                                            {item.date}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                                        <Link to={"/ad/" + item._id} className="btn login-btn open-ad-btn" style={{ marginTop: "0px" }}>Open Ad</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
            else {
                e = <h2 className="seached-ad-sub-heading pt-5 pb-5" >Sorry, No ads found matching your query!</h2>
            }
        }
        if (searchedAds === null) {
            e = <h2 className="message" >You have not searched for an ad</h2>

        }

        var sa = localStorage.getItem('sa')

        //Skeleteon Card Ads
        for (let i = 1; i !== skeletonCards.length; i++) {
            sc = skeletonCards.map((item, index) => {
                return <div key={Math.random()} className="card-wrapper card-background-color" >
                    <div className="card" style={im} >
                        <Skeleton className="skeleton-loader" height={200} />
                        <div className="card-body">
                            <h5 className="card-title text-left"><Skeleton className="skeleton-loader" /></h5><h5 className="card-title text-left"><Skeleton className="skeleton-loader" /></h5>
                            <div className="divider"><hr className="ad-hr" /></div>
                            <p className="text-left"> <Skeleton className="skeleton-loader" /></p>
                            <div className="card-text text-left ad-description"><Skeleton className="skeleton-loader" /></div>
                            <div className="card-text text-left ad-description"><Skeleton className="skeleton-loader" /></div>
                            <div className="d-flex space-btw align-center ads-btn-container">
                                <span className="float-left" style={{ fontSize: '13px', color: 'grey' }}><Skeleton className="skeleton-loader" width={90} /></span>
                                <span>
                                    <Skeleton className="skeleton-loader" width={90} />
                                </span>
                            </div>
                            <div style={{ textAlign: 'left', marginTop: ' 10px' }} className="float-left">
                                <Skeleton className="skeleton-loader" width={100} />
                            </div>
                        </div>
                    </div>
                </div>
            })
        }

        return (

            <div className="main-content-container text-color" style={{ textAlign: "center" }}>

                <div className="rdow">
                    {sa ?
                        //This displays Searched Ads
                        <div style={{ width: '100%' }} >
                            <span className="seached-ad-heading">Searched Ads</span>
                            <div className="ads-container">
                                {e}
                            </div>
                            <button className="btn login-btn postAd-submit-btn" onClick={this.allAds}>All Ads</button>
                        </div>
                        :
                        //This displays All Ads
                        <div id="as" className="ads-container">

                            {
                                this.state.isDataLoaded ?
                                    <>{d}</>
                                    :
                                    <>{sc}</>
                            }

                        </div>
                    }

                </div>

                <div className="content-carousel-container" style={{ marginBottom: "0px", marginTop: "50px" }}>
                    <AliceCarousel showSlideInfo={true} buttonsDisabled={true} duration={400} autoPlay={true} autoPlayInterval={5000} mouseDragEnabled >
                        <img src={require('./../images/ca4.jpg')} alt="slider1" height='500' width='1200' onDragStart={handleOnDragStart} className="content-carousel-image" />
                        <img src={require('./../images/ca3.jpg')} alt="slider2" height='500' width='1200' onDragStart={handleOnDragStart} className="content-carousel-image" />
                        <img src={require('./../images/ca2.jpg')} alt="slider3" height='500' width='1200' onDragStart={handleOnDragStart} className="content-carousel-image" />
                        <img src={require('./../images/ca1.jpg')} alt="slider4" height='500' width='1200' onDragStart={handleOnDragStart} className="content-carousel-image" />
                    </AliceCarousel>
                </div>
            </div>

        );

    }
}
export default Content
