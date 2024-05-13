export default function Tables() {
    return(
        <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>React</td>
              <td>5/20/24</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>Hooks</td>
              <td>5/27/24</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>Server APIs</td>
              <td>5/31/24</td>
              <td>97</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>User Authentication</td>
              <td>6/05/24</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>MongoDB</td>
              <td>6/12/24</td>
              <td>93</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Domain Objects</td>
              <td>6/20/24</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>Public APIs</td>
              <td>6/27/24</td>
              <td>99</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
}