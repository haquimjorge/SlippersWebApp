import '../shoeDetails.scss';
import Menu from './Menu';
import Footer from './Footer';

function ShoeDetails() {
    return (
        <>
            <Menu />
            <div className="shoe-body">
                <div class="shoe-container">
                    <div class="images">
                        <img className="zoom" src="https://d3ugyf2ht6aenh.cloudfront.net/stores/090/848/products/081ddb2b-257b-4145-8dd1-d7a40792be65-c1eac204abe79eb80616190381701708-320-0.jpg" />
                    </div>
                    <div class="slideshow-buttons">
                        <div class="one"></div>
                        <div class="two"></div>
                        <div class="three"></div>
                        <div class="four"></div>
                    </div>
                    <p class="pick">choose size</p>
                    <div class="sizes">
                        <div class="size">5</div>
                        <div class="size">6</div>
                        <div class="size">7</div>
                        <div class="size">8</div>
                        <div class="size">9</div>
                        <div class="size">10</div>
                        <div class="size">11</div>
                        <div class="size">12</div>
                    </div>
                    <div class="product">
                        <p>Male elegant shoe</p>
                        <h1>Black Enterizo Murphy</h1>
                        <h2>$150</h2>
                        <p class="desc">Argentine footwear handmade with the highest standards in craftmanship and premium national materials.</p>
                        <p class="desc">Type: One cut</p>
                        <p class="desc">Exterior: Patent cow leather</p>
                        <p class="desc">Interior: Full grain goat leather</p>
                        <p class="desc">Sole: Full grain cow leather</p>
                        <p class="desc">Heel: Full grain cow leather with Rubber top</p>
                        <p class="desc">Height: 3.5 cm / 1.38 inches</p>
                        <div class="select">
                            <select>
                                <option value="1">Choose you size</option>
                                <option value="2">5</option>
                                <option value="3">6</option>
                                <option value="4">8</option>
                                <option value="5">9</option>
                                <option value="6">10</option>
                                <option value="7">11</option>
                                <option value="8">12</option>
                            </select>
                        </div>
                        <div class="select">
                            <select>
                                <option value="1">Choose your color</option>
                                <option value="2">Black</option>
                                <option value="3">Grey</option>
                                <option value="4">Brown</option>
                                <option value="5">Gold</option>
                               
                            </select>
                        </div>
                        <div class="buttons">
                            <button className="add">Add to Cart</button>
                            <button className="like">♥</button>
                            <button className="paypal">PayPal</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ShoeDetails