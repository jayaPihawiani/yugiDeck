import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import star from "../assets/image/star.png";
import SpinLoading from "../components/SpinLoading";
import { DataContext } from "../context/DataContext";

const Main = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({});
  const [paginate, setPaginate] = useState({ page: 0, limit: 10, name: "" });
  const [loading, setLoading] = useState(false);
  const { search } = useContext(DataContext);
  const [err, setErr] = useState(false);

  const getData = async () => {
    setErr(false);
    try {
      setLoading(true);
      const resp = await axios.get(
        `http://localhost:5000/api?page=${paginate.page}&limit=${paginate.limit}&name=${search}`
      );

      if (resp.status === 200) {
        setData(resp.data.data);
        setPage(resp.data);
      }
    } catch (error) {
      console.error("ERROR: " + error.response.data);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const pageChange = ({ selected }) => {
    setPaginate({ ...paginate, page: selected });
  };

  useEffect(() => {
    getData();
  }, [paginate, search]);

  {
    return !err ? (
      <React.Fragment>
        {loading && <SpinLoading />}
        <div className="container-fluid main">
          <div className="container min-vh-100">
            <div className="d-flex">
              <select
                className="mt-5 ms-auto p-2"
                onChange={(e) =>
                  setPaginate({ ...paginate, limit: e.target.value })
                }
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 pt-3">
              {data.map((e) => {
                return (
                  <div key={e.id} className="col mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-dark">
                        <h5 className="text-light">{e.id}</h5>
                        <h4 className="text-light">{e.name}</h4>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <img
                          src={e.card_images[0].image_url}
                          alt=""
                          className="w-100 py-3"
                        />
                        {e.level && (
                          <p>
                            <span className="fw-bold">Lv</span>:{" "}
                            {Array.from({ length: e.level }).map((e, index) => (
                              <img
                                src={star}
                                alt=""
                                className="star"
                                key={index}
                              />
                            ))}
                          </p>
                        )}
                        {e.atk >= 0 && (
                          <p>
                            <span className="fw-bold">Atk</span>: {`${e.atk}`}
                          </p>
                        )}
                        {e.def >= 0 && (
                          <p>
                            <span className="fw-bold">Def</span>: {e.def}
                          </p>
                        )}
                        <p>
                          <span className="fw-bold">Frame:</span> {e.frameType}
                        </p>
                        {e.attribute && (
                          <p>
                            <span className="fw-bold">Atr:</span> {e.attribute}
                          </p>
                        )}
                        <p>
                          <span className="fw-bold">Frame:</span> {e.frameType}
                        </p>
                        <p>{e.desc}</p>
                        <p>
                          <span className="fw-bold">Type:</span>{" "}
                          {e.archetype ? e.archetype : e.type}
                        </p>
                        <p>
                          <span className="fw-bold">Race:</span> {e.race}
                        </p>
                      </div>
                      <div className="card-footer bg-dark text-light">
                        <span className="fw-bold">Url: </span>
                        {e.ygoprodeck_url}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row pt-3 pb-5">
              <div className="col d-flex align-items-center">
                <p className="text-light">
                  Total row: {page.total} Page: {page.page + 1} of{" "}
                  {page.totalPages}
                </p>
                <nav className="ms-3">
                  {page.totalPages && (
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      pageCount={page.totalPages}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={pageChange}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#171716" }}
      >
        <h1 className="text-light">No Data Found!</h1>
      </div>
    );
  }
};

export default Main;
