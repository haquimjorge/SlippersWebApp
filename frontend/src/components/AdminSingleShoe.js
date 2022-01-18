import Card from "react-bootstrap/Card";
import { React, useState } from "react";
import { connect } from "react-redux";
import shoeActions from "../redux/actions/shoeActions";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormR from "react-bootstrap/Form";
import CenterModalShoe from "./CenterModalShoe";
import DATA from "../utilities/hardData";
import AdminRowInputText from "./AdminRowInputText";
import { toastr } from "react-redux-toastr";
import RowInputSelect from "./RowInputSelect"

function AdminSingleShoe(props) {
  const [modalShow, setModalShow] = useState(false);
  const [season, setSeason] = useState("");
  const [gender, setGender] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [stash, setStash] = useState({});

  function handleIdToDelete(id) {
    setModalShow(true);
    props.sendIdtoDeleteShoe(id);
  }
  function handleModify(input, attribute, shoe) {
    if (attribute === "season") {
      setSeason(input);
    } else if (attribute === "gender") {
      setGender(input);
    } else if (attribute === "shipping") {
      setShipping(input);
    } else if (attribute === "subcategory") {
      setSubcategory(input);
    }
    showSaveButton(shoe, attribute, input);
  }

  function handleStashSave(id) {
    let currentStash = stash;
    let aid = { id };
    currentStash = { ...currentStash, ...aid };
    props.modifyShoe(currentStash);
    toastr.success("Shoe edited!");
    setStash({});
  }

  function handleModifyCategory(input, attribute, shoe) {
    setCategory(input);
    showSaveButton(shoe, attribute, input);
  }

  function showSaveButton(dbShoe, attribute, input) {
    const deleteAttribute = () => {
      let currentStash = stash;
      delete currentStash[attribute];
      setStash(currentStash);
    };

    if (dbShoe.category && dbShoe.category._id === input) {
      let currentStash = stash;
      delete currentStash[attribute];
      delete currentStash.subcategory;
      setStash(currentStash);
    } else if (
      (dbShoe.subcategory[0] &&
        dbShoe.subcategory[0]._id.toString() === input) ||
      dbShoe[attribute] === input
    ) {
      deleteAttribute();
    } else if (dbShoe[attribute] !== input) {
      if (attribute === "category") {
        let firstSub = props.allSubCategories.filter(
          (sub) => sub.parent === input
        );
        if (firstSub.length > 0) {
          let codex = firstSub[0]._id;
          let auxiliar = {
            category: input,
            subcategory: codex,
          };
          let currentStash = stash;
          currentStash = { ...currentStash, ...auxiliar };
          return setStash(currentStash);
        }
      }
      let aux = { [attribute]: input };
      let currentStash = stash;
      currentStash = { ...currentStash, ...aux };
      setStash(currentStash);
    }
  }

//   function RowInputSelect({ label, ...props }) {
//     return (
//       <FloatingLabel label={label}>
//         <FormR.Select {...props} size="sm" />
//       </FloatingLabel>
//     );
//   }

  return (
    <>
      <CenterModalShoe
        type="shoe"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Card
        key={props.shoe._id}
        className="col-12 col-md-6 col-xxl-4 col-xl-4 col-lg-6 col-sm-12 col-xs-12 admin-single-shoe-card p-2"
      >
        <Card.Img
          className="card-admin-items"
          variant="top"
          style={{ backgroundImage: `url(${props.shoe.image})` }}
        />
        <Card.Body className="admin-card-body d-flex flex-column align-items-around justify-content-between">
          <AdminRowInputText
            input={props.shoe.name}
            id={props.shoe._id}
            identifier={"name"}
          />
          <AdminRowInputText
            input={props.shoe.price}
            id={props.shoe._id}
            identifier={"price"}
          />
          <AdminRowInputText
            input={props.shoe.lastPrice}
            id={props.shoe._id}
            identifier={"lastPrice"}
          />
          <AdminRowInputText
            input={props.shoe.description}
            id={props.shoe._id}
            identifier={"description"}
          />
          <AdminRowInputText
            input={props.shoe.image}
            id={props.shoe._id}
            identifier={"image"}
          />

          <RowInputSelect
            value={shipping !== "" ? shipping : props.shoe.shipping}
            label="Shipping"
            onChange={(e) =>
              handleModify(e.target.value, "shipping", props.shoe)
            }
          >
            {DATA.shipping.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </RowInputSelect>

          <RowInputSelect
            value={gender !== "" ? gender : props.shoe.gender}
            label="Gender"
            onChange={(e) => handleModify(e.target.value, "gender", props.shoe)}
          >
            {DATA.gender.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </RowInputSelect>

          <RowInputSelect
            value={season !== "" ? season : props.shoe.season}
            label="Season"
            onChange={(e) => handleModify(e.target.value, "season", props.shoe)}
          >
            {DATA.seasons.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </RowInputSelect>

          <RowInputSelect
            value={category !== "" ? category : props.shoe.shipping}
            label="Category"
            onChange={(e) =>
              handleModifyCategory(e.target.value, "category", props.shoe)
            }
          >
            <option value={props.shoe.category?._id}>
              {props.shoe.category?.name}
            </option>
            {props.categories
              .filter((cat) => cat._id !== props.shoe.category?._id)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </RowInputSelect>

          <RowInputSelect
            value={
              subcategory !== ""
                ? subcategory
                : props.shoe.subcategory[0] && props.shoe.subcategory[0].name
            }
            label="Sub Category"
            onChange={(e) =>
              handleModify(e.target.value, "subcategory", props.shoe)
            }
          >
            {category === "" && (
              <option value={props.shoe.subcategory[0]?._id}>
                {props.shoe.subcategory[0]?.name}
              </option>
            )}
            {category !== props.shoe.category?._id ? (
              ""
            ) : (
              <option value={props.shoe.subcategory[0]?._id}>
                {props.shoe.subcategory[0]?.name}
              </option>
            )}
            {category === props.shoe.category?._id ? (
              props.allSubCategories
                .filter((sub) => sub._id !== props.shoe.subcategory[0]?._id)
                .filter((sub) => sub.parent === props.shoe.category?._id)
                .map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))
            ) : props.allSubCategories.filter((sub) => sub.parent === category)
                .length ? (
              props.allSubCategories
                .filter((sub) => sub.parent === category)
                .map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))
            ) : category === "" ? (
              props.allSubCategories
                .filter((sub) => sub._id !== props.shoe.subcategory[0]?._id)
                .filter((sub) => sub.parent === props.shoe.category?._id)
                .map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))
            ) : (
              <option value="">No sub categories yet</option>
            )}
          </RowInputSelect>
        </Card.Body>
        {Object.keys(stash).length !== 0 ? (
          <button
            onClick={() => handleStashSave(props.shoe._id)}
            className="admin-shoes-save-button w-50 align-self-center"
          >
            Save
          </button>
        ) : (
          <button className="admin-shoes-save-button invisible w-50 align-self-center">
            Save
          </button>
        )}

        <Card.Footer className="admin-shoes-card-footer">
          <button
            onClick={() => handleIdToDelete(props.shoe._id)}
            className="d-flex justify-content-center sign-button w-100"
          >
            Delete
          </button>
        </Card.Footer>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.shoeReducer.categories,
    allSubCategories: state.shoeReducer.allSubCategories,
  };
};

const mapDispatchToProps = {
  modifyShoe: shoeActions.modifyShoe,
  sendIdtoDeleteShoe: shoeActions.sendIdtoDeleteShoe,
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleShoe);
