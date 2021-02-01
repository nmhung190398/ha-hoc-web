const GENDER = {
    MALE: 1,
    FEMALE: 0
}

const getData1 = () => {
    let data = [];
    let firstName = ['hung', "ha", "chinh", "hieu"];
    let lastName = ["dang", "nguyen", "phung"];
    let genders = Object.keys(GENDER).map(i => GENDER[i]);
    for (let i = 1; i <= 10; i++) {
        data.push({
            id: i,
            name: randomInArray(firstName) + " " + randomInArray(lastName),
            age: randomElement(20, 40),
            gender: randomInArray(genders)
        })
    }
    return data;
}
const formatQuery = (query) => {
    const tmp = {};
    Object.keys(query).forEach(key => {
        if (query[key]) {
            tmp[key] = query[key];
        }
    })
    const searchParams = new URLSearchParams(query);
    return searchParams.toString();
}

const getData = async (query) => {
    const res = await axios.get('/api/student?' + formatQuery(query));
    console.log(res);
    if (res.data.status == 200) {
        return res.data.data;
    }
    return {
        items: [],
        totalItems: 0,
        page: 1,
        perPage: 0
    };
}

const addStudent = async (student) => {
    const rs = await axios.post("/api/student", student);
    return rs.data.status == 200;

}

const randomElement = (a, b) => {
    let hieu = b - a;
    let rand = Math.floor(Math.random() * hieu);
    return a + rand;
}

const randomInArray = (array) => {
    let index = randomElement(0, array.length);
    return array[index];
}

