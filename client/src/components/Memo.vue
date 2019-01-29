<template>
  <div class="memo-wrapper">
    <h3>Модификаторы характеристик</h3>
      <table>
          <tr>
              <th>Значение хар-ки</th>
              <th>Модификатор</th>
          </tr>
          <tr>
              <td>1</td>
              <td>-5</td>
          </tr>
          <tr>
              <td>2-3</td>
              <td>-4</td>
          </tr>
          <tr>
              <td>4-5</td>
              <td>-3</td>
          </tr>
          <tr>
              <td>6-7</td>
              <td>-2</td>
          </tr>
          <tr>
              <td>8-9</td>
              <td>-1</td>
          </tr>
          <tr>
              <td>10-11</td>
              <td>+0</td>
          </tr>
          <tr>
              <td>12-13</td>
              <td>+1</td>
          </tr>
          <tr>
              <td>14-15</td>
              <td>+2</td>
          </tr>
          <tr>
              <td>16-17</td>
              <td>+3</td>
          </tr>
          <tr>
              <td>18-19</td>
              <td>+4</td>
          </tr>
          <tr>
              <td>20-21</td>
              <td>+5</td>
          </tr>
          <tr>
              <td>22-23</td>
              <td>+6</td>
          </tr>
          <tr>
              <td>24-25</td>
              <td>+7</td>
          </tr>
          <tr>
              <td>26-27</td>
              <td>+8</td>
          </tr>
          <tr>
              <td>28-29</td>
              <td>+9</td>
          </tr>
          <tr>
              <td>30</td>
              <td>+10</td>
          </tr>
      </table>

      <h3>Развитие персонажа</h3>
      <table>
          <tr>
              <th>Опыт</th>
              <th>Уровень</th>
              <th>Бонус мастерства</th>
          </tr>
          <tr>
              <td>0</td>
              <td>1</td>
              <td>+2</td>
          </tr>
          <tr>
              <td>300</td>
              <td>2</td>
              <td>+2</td>
          </tr>
          <tr>
              <td>900</td>
              <td>3</td>
              <td>+2</td>
          </tr>
          <tr>
              <td>2 700</td>
              <td>4</td>
              <td>+2</td>
          </tr>
          <tr>
              <td>6 500</td>
              <td>5</td>
              <td>+3</td>
          </tr>
          <tr>
              <td>14 000</td>
              <td>6</td>
              <td>+3</td>
          </tr>
          <tr>
              <td>23 000</td>
              <td>7</td>
              <td>+3</td>
          </tr>
          <tr>
              <td>34 000</td>
              <td>8</td>
              <td>+3</td>
          </tr>
          <tr>
              <td>48 000</td>
              <td>9</td>
              <td>+4</td>
          </tr>
          <tr>
              <td>64 000</td>
              <td>10</td>
              <td>+4</td>
          </tr>
          <tr>
              <td>85 000</td>
              <td>11</td>
              <td>+4</td>
          </tr>
          <tr>
              <td>100 000</td>
              <td>12</td>
              <td>+4</td>
          </tr>
          <tr>
              <td>120 000</td>
              <td>13</td>
              <td>+5</td>
          </tr>
          <tr>
              <td>140 000</td>
              <td>14</td>
              <td>+5</td>
          </tr>
          <tr>
              <td>165 000</td>
              <td>15</td>
              <td>+5</td>
          </tr>
          <tr>
              <td>195 000</td>
              <td>16</td>
              <td>+5</td>
          </tr>
          <tr>
              <td>225 000</td>
              <td>17</td>
              <td>+6</td>
          </tr>
          <tr>
              <td>265 000</td>
              <td>18</td>
              <td>+6</td>
          </tr>
          <tr>
              <td>305 000</td>
              <td>19</td>
              <td>+6</td>
          </tr>
          <tr>
              <td>335 000</td>
              <td>20</td>
              <td>+6</td>
          </tr>
      </table>
  </div>
</template>


<style lang="scss">

.memo-wrapper {
  padding: 10px 20px;
  overflow-x: auto;

  table {
    min-width: 500px;
    width: auto;
  }
}

@media( max-width: 768px) {
  .memo-wrapper table {
    width: 400px;
    min-width: initial;
  }
}

</style>
