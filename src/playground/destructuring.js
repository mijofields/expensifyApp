//Objects
const person = {
    name: "Mike",
    age: 37,
    location: {
        city: "Dallas",
        zipcode: 75204
    }
};

const {name = "Anon", age, location} = person;
const {city, zipcode : zip} = person.location;

console.log(name);
console.log(age);
console.log(location);
console.log(`-------------------`);
console.log(city);
console.log(zip);


const book = {
    title: "American Pyscho",
    author: "Brett Easton Ellis",
    publisher: {
        name: "Vintage"
    }
}

const {title, author} = book;
const {name: publisherName = "Self-Published"} = book.publisher;

console.log(publisherName);

//Arrays

const address = ['1717 Annex Avenue', '#305', 'Dallas', 'TX'];

console.log(`You are in ${address[2]}, ${address[3]}`)

console.log(`------------------------`)

const [street, unit, town, state = 'NY'] = address;

console.log(`You are in ${town}, ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$3.00'];

const [drinkName,, priceMedium] = item;

console.log(`--------------------------`);

console.log(`a medium ${drinkName} costs ${priceMedium}. `)

