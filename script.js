const Web3 = require("web3");
const contractABI = [
  [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "completed",
          type: "bool",
        },
      ],
      name: "TaskCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "completed",
          type: "bool",
        },
      ],
      name: "TaskCreated",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_content",
          type: "string",
        },
      ],
      name: "createTask",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "taskCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "tasks",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "content",
          type: "string",
        },
        {
          internalType: "bool",
          name: "completed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "toggleCompleted",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
];
const contractAddress = "0x51C78a61C4CF196c7cb46CF5170728a571718099";

const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

const todoListContract = new web3.eth.Contract(contractABI, contractAddress);

async function createTask(content) {
  const accounts = await web3.eth.getAccounts();
  const result = await todoListContract.methods
    .createTask(content)
    .send({ from: accounts[0] });
  console.log("Task created:", result);
}

async function toggleTaskCompleted(taskId) {
  const accounts = await web3.eth.getAccounts();
  const result = await todoListContract.methods
    .toggleCompleted(taskId)
    .send({ from: accounts[0] });
  console.log("Task completion status toggled:", result);
}

async function getAllTasks() {
  const taskCount = await todoListContract.methods.taskCount().call();
  const tasks = [];

  for (let i = 1; i <= taskCount; i++) {
    const task = await todoListContract.methods.tasks(i).call();
    tasks.push(task);
  }

  console.log("All tasks:", tasks);
}

createTask("Buy groceries");
createTask("Pay bills");
toggleTaskCompleted(1);
getAllTasks();
