import Forms from "./Forms";
import Heading from "./Heading";
import Images from "./Images";
import Lists from "./Lists";
import Paragraph from "./Paragraph";
import Tables from "./Tables";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <Heading />
      <Paragraph />
      <Lists />
      <Tables />
      <Images />
      <Forms />
      <h5 id="wd-buttons">Buttons</h5>
      <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
        Hello World!
      </button>
      <h5>File upload</h5>
      <input id="wd-upload" type="file" />
      <h5 id="wd-radio-buttons">Radio buttons</h5>

      <label>Favorite movie genre:</label><br />

      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label><br />

      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label><br />

      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label><br />

      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <h5 id="wd-checkboxes">Checkboxes</h5>
      <label>Favorite movie genre:</label>
      <br />
      <input type="checkbox"
        name="check-genre" id="wd-chkbox-comedy" />
      <label htmlFor="wd-chkbox-comedy">Comedy</label><br />
      <input type="checkbox"
        name="check-genre" id="wd-chkbox-drama" />
      <label htmlFor="wd-chkbox-drama">Drama</label><br />
      <input type="checkbox"
        name="check-genre" id="wd-chkbox-scifi" />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br />
      <input type="checkbox"
        name="check-genre" id="wd-chkbox-fantasy" />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      <h4 id="wd-dropdowns">Dropdowns</h4>

      <h5>Select one</h5>
      <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br />
      <select id="wd-select-one-genre">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>

      <h5>Select many</h5>
      <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br />
      <select id="wd-select-many-genre" multiple>
        <option selected value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction</option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <h4>Other HTML field types</h4>

      <label htmlFor="wd-text-fields-email"> Email: </label>
      <input type="email"
        placeholder="jdoe@somewhere.com"
        id="wd-text-fields-email" /><br />

      <label htmlFor="wd-text-fields-salary-start"> Starting salary:
      </label>
      <input type="number"
        id="wd-text-fields-salary-start"
        placeholder="1000"
        value="100000" /><br />

      <label htmlFor="wd-text-fields-rating"> Rating: </label>
      <input type="range" id="wd-text-fields-rating"
        placeholder="Doe"
        max="5"
        value="4" /><br />

      <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
      <input type="date"
        id="wd-text-fields-dob"
        value="2000-01-21" /><br />
      <h4>Anchor tag</h4>

      Please
      <a href="https://www.lipsum.com"> click here </a>
      to get dummy text<br />
    </div>
  );
}
