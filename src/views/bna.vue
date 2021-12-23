<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3 pinkkk">
          Menu Bakery
        </h1>
      </v-col>
    </v-row>
    <v-row>
   <v-card
            white
            flat
  >
            <v-toolbar
              flat
              height="0"
    >
               <v-switch
                v-model="$vuetify.theme.dark"
                hint="Click to change Theme"
                inset
                label="Theme Dark"
                persistent-hintํ
              ></v-switch>
            </v-toolbar>          
          </v-card>
</v-row>

    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <template>
          <v-card>
            <v-card-title>
              SHOP
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="bmiTable"
              :loading="!bmiTable.length"
              :search="search"
            >
              <template slot="progress">
                <v-progress-linear
                  color="red"
                  indeterminate
                ></v-progress-linear>
              </template>

              <template v-slot:[`item.date`]="{ item }">
                {{ formatTimestamp(item.date) }}
              </template>

              <template v-slot:[`item.bmi`]="{ item }">
                <v-chip v-if="item.bmi != 0" :color="getColor(item.bmi)" dark>
                  {{ item.bmi }}
                </v-chip>
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-icon large color="yellow darken-2" @click="editItem(item)"
                  >mdi-pencil-outline
                </v-icon>

                <v-icon large color="red darken-2" @click="deleteItem(item)"
                  >mdi-close-circle
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </template>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="card-shadow card-padding">
            <v-card-title
              >Delete? ({{ itemSelected.bmi }})</v-card-title
            >
            <v-card-actions class="pb-0">
              <v-spacer></v-spacer>
              <v-btn @click="closeDelete" color="yellow">Cancel</v-btn>

              <v-btn @click="deleteItemConfirm(itemSelected)" color="error"
                >Ok</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>


    <template>
  <v-row justify="center">
    <v-col cols="6">
      <v-img
        :src="`https://www.supermarketperimeter.com/ext/resources/0518-cakes.png?t=1589812932&width=1080`"
        max-height="600"
        
        
        
        aspect-ratio="1"
        class="grey lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </template>
  </v-container>
</template>

<script>
// import { getFirestore, collection, getDocs } from "firebase/firestore";

// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   onSnapshot,
//   doc, setDoc, addDoc
// } from "firebase/firestore";Timestamp
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc, deleteDoc, setDoc, Timestamp
} from "firebase/firestore";

import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

export default {
  data: () => ({
    bmiTable: [
      {
        score: 8,
        date: "2021-9-25",
        bmi: 120,
        email: "",
        note: "Brownies",
      },
      {
        score: 8,
        date: "2021-9-25",
        bmi: 110,
        email: "",
        note: "Cookie",
      },
      {
        score: 8,
        date: "2021-9-25",
        bmi: 100,
        email: "",
        note: "Choco Almond Coco",
      },
      
    
    ],

    search: "",
    headers: [
  
      {
        text: "Date",
        value: "date",
      },
      {
        text: "Score",
        value: "score",
      },
      {
        text: "Prize",
        value: "bmi",
      },
      {
        text: "Email",
        value: "email",
      },
      {
        text: "Name",
        value: "note",
      },
    ],

    valid: true,
    bmi: 0,
    bmiRules: [
      (v) => !!v || "BMI is required",
      (v) => (v && v > 0 && v < 1000) || "BMI more than 0 and less than 1000",
    ],
    scoreRules: [
      (v) => !!v ||  "score",
      (v) => (v && v > 0 && v < 1000) || "score more than 0 and less than 1000",
    ],
    date: "",
    emailRules: [
        v => !!v  ||'E-mail is required',
        v => /.+@.+/.test(v)||  'E-mail must be valid',
      ],

    dateRules: [(v) => !!v || "Date is required"],
    note: "",

    dialog: false,
    dialogDelete: false,
    menu: false,
    modal: false,
    editedIndex: -1,
    itemSelected: {},
    db : getFirestore(),


    editedItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },

    defaultItem: {
      bmi: 10,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      note: "",
    },




  }),

  methods: {
    getColor(bmi) {
      if (bmi < 70) return "green";
      else if (bmi >= 70 && bmi < 140) return "orange";
      else return "red";
    },
    SignInAnonymously() {
      const auth = getAuth();
      signInAnonymously(auth)
        .then(() => {
          // Signed in.. 
        })
        .catch((error) => {
          console.log(error);
          // ... 
        });
    },

    authStateChanged() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties 
          // https://firebase.google.com/docs/reference/js/firebase.User 
          console.log(user);
          // ... 
        } else {
          // User is signed out 
          // ... 
        }
      });
    },


    validate() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex == -1) {
          this.createItem();
        } else {
          this.updateItem();
        }
        console.log(this.bmiTable);
        this.close();
      } else {
        alert("Form not valid");
      }
    },

    readItem() {
      if (localStorage.getItem("bmi") != null) {
        this.bmiTable = JSON.parse(localStorage.getItem("bmi"));
      }

      console.log(this.bmiTable);
    },


    async getItemFromFirestore() {
      console.log("get and sync");



      const q = query(collection(this.db, "bmiTable"), where("bmi", ">", 0));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.bmiTable = [];
        var tmp = {};
        querySnapshot.forEach((doc) => {
          tmp = Object.assign({ uid: doc.id }, doc.data());
          tmp.date = new Date(tmp.date.toDate()).toISOString().substr(0, 10),
            this.bmiTable.push(tmp);
        });
      });
      console.log(this.bmiTable);
      console.log(unsubscribe);
    },

    // getItemFromAPI() {
    //   console.log("get from api");
    //   fetch("http://localhost:8888/api/bmi/readAll")
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((myJson) => {
    //       console.log(myJson);
    //       this.bmiTable = myJson;
    //     });
    // },

    

    // createItem() {
      
    //   fetch("http://localhost:8888/api/bmi/", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       bmi: 20,
    //       date: '2021-11-01T17:00:00.000Z',
    //       note: "1" ,          
    //     }),
    //     headers: {
    //       "Content-type": "appplication/json"}
    //     })
    //     .then(response => response.json())
    //     .then(json => console.log(json))       
    // },

    

        async createItem() {
          this.editedItem.bmi = parseInt(this.editedItem.bmi);
          // this.bmiTable.push(this.editedItem);


          this.editedItem.date = Timestamp.fromDate(new Date(this.editedItem.date));

          // await setDoc(doc(this.db, "bmiTable", "id"), this.editedItem);
          // console.log("insert");

          const docRef = await addDoc(collection(this.db, "bmiTable"), this.editedItem);
          console.log("Document written with ID: ", docRef.id);


          // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));

          // localStorage.bmi = this.editedItem;
        },

        editItem(item) {
        // this.editedIndex = this.bmiTable.indexOf(item);
        this.editedIndex = item.uid;


        // item.date = new Date(item.date.toDate()).toISOString().substr(0, 10);

        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
    async updateItem() {
        this.editedItem.bmi = parseInt(this.editedItem.bmi);
        // console.log(this.editedItem);
        this.editedItem.date = Timestamp.fromDate(new Date(this.editedItem.date));
        await setDoc(doc(this.db, "bmiTable", this.editedIndex), this.editedItem);
        // console.log("Update");
        // Object.assign(this.bmiTable[this.editedIndex], this.editedItem);
        // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));
      },

      deleteItem(item) {
        this.itemSelected = item;
        // this.editedIndex = this.bmiTable.indexOf(item);

        this.editedIndex = item.uid;
        console.log(this.editedIndex);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

    async deleteItemConfirm() {
        // this.bmiTable.splice(this.editedIndex, 1);
        // localStorage.setItem("bmi", JSON.stringify(this.bmiTable));

        await deleteDoc(doc(this.db, "bmiTable", this.editedIndex));

        console.log("Delete");
        this.closeDelete();
      },

      close() {
        this.dialog = false;
        this.clearItem();
      },
      closeDelete() {
        this.dialogDelete = false;
        this.clearItem();
      },

      clearItem() {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.itemSelected = {};
        console.log(this.editedIndex);
      },

      formatTimestamp(t) {

        // return t.toDate().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
        if (t instanceof Date) {
          return t
            .toDate()
            .toLocaleDateString("th-TH", { timeZone: "Asia/Bangkok" });
        } else {
          return t;
        }
      },
    },
    watch: {
      editedIndex(val) {
        console.log(val);
      },
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
      },
    },
    mounted() {
      // this.readItem();
      this.SignInAnonymously();
      this.authStateChanged();
      this.getItemFromFirestore();
      // this.getItemFromAPI();

    },
  };
</script>

<style>
.green123 {
  color: green;
}
</style>
