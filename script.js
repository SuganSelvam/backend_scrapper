const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');

const fs = require('fs');
 
(async () => {
 
    const config = {
        baseSiteUrl: `https://www.snapdeal.com/`,
        startUrl: `https://www.snapdeal.com/`,
        filePath: './images/',
        concurrency: 10,
        maxRetries: 3,      
        logPath: './logs/'
    }
 
    const articles = []; 
    const getPageObject =async (pageObject) => {
        await Promise.resolve() 
        articles.push(pageObject)
    }
 
    const scraper = new Scraper(config); 
    const root = new Root();

    const category = new OpenLinks('.brandLabelFooter',{name:'category',getPageObject}); 
    const title = new CollectContent(".product-title ",{name : "title"}) 
    const price = new CollectContent(".lfloat .product-price ",{name : "price"}) 
    const image = new DownloadContent('img', { name: 'image' });
    const rating = new CollectContent(".product-rating-count",{name:"rating"})    
    const discount = new CollectContent(".product-discount",{name:"discount"})

    root.addOperation(category);
    category.addOperation(title)
    category.addOperation(price)
    category.addOperation(image)
    category.addOperation(rating)
    category.addOperation(discount)

 
    await scraper.scrape(root); 
    fs.writeFile('./articles.json', JSON.stringify(articles), () => { })
 
})();   