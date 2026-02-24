import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {
    const PAGE_SIZE = 24;
    const [students, setStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterest, setSearchInterest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s26/hw4/students", { headers: { "X-CS571-ID": "bid_28bc52eb10fc7e7d1d9b3d3630be449ffcf7a8758d8c4223f9f1129d97952f3a" } })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }
            );

    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchName, searchMajor, searchInterest]);

    const search = students.filter(student => {
        const name = searchName.trim().toLowerCase();
        const major = searchMajor.trim().toLowerCase();
        const interest = searchInterest.trim().toLowerCase();
        const fullName = (student.name.first + " " + student.name.last).toLowerCase();

        return (
            (name === "" || fullName.includes(name)) && (major === "" || student.major.toLowerCase().includes(major)) &&
            (interest === "" || student.interests.some(i => i.toLowerCase().includes(interest)))
        );
    });

    const totalPages = Math.ceil(search.length / PAGE_SIZE);

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const studentsPerPage = search.slice(start, end);

    const searchReset = () => {
        setSearchName("");
        setSearchMajor("");
        setSearchInterest("");
        setCurrentPage(1);
    };

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={(s) => setSearchName(s.target.value)} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={(s) => setSearchMajor(s.target.value)} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={searchInterest} onChange={(s) => setSearchInterest(s.target.value)} />
            <br />
            <Button variant="neutral" onClick={searchReset}>Reset Search</Button>
        </Form>
        <p id="num-results">There are {search.length} student(s) matching your search.</p>
        <Container fluid>
            <Row id='students'>
                {studentsPerPage.map(student => (
                    <Col key={student.id}
                        xs={12} sm={12} md={6} lg={4} xl={3}>
                        <Student name={student.name} major={student.major} interests={student.interests} numCredits={student.numCredits} fromWisconsin={student.fromWisconsin} />
                    </Col>
                ))}
            </Row>
        </Container>
        <Pagination>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0} />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                    {page}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} />
        </Pagination>
    </div>

}

export default Classroom;