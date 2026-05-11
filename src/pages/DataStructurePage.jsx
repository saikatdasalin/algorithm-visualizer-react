import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiPlay } from "react-icons/fi";
import StructureNode from "../components/visualizers/StructureNode";

const tabs = [
  "stack",
  "queue",
  "linked-list",
  "binary-tree",
  "bst",
];

const buildBST = (values) => {
  const root = null;

  const insert = (node, value) => {
    if (!node) return { value, left: null, right: null };
    if (value < node.value) return { ...node, left: insert(node.left, value) };
    return { ...node, right: insert(node.right, value) };
  };

  return values.reduce((acc, value) => insert(acc, value), root);
};

const treeLevels = (root) => {
  if (!root) return [];
  const queue = [root];
  const levels = [];

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i += 1) {
      const node = queue.shift();
      level.push(node?.value ?? null);
      if (node) {
        queue.push(node.left);
        queue.push(node.right);
      }
    }

    if (level.every((item) => item === null)) break;
    levels.push(level);
  }

  return levels;
};

function DataStructurePage() {
  const [activeTab, setActiveTab] = useState("stack");
  const [valueInput, setValueInput] = useState("42");

  const [stack, setStack] = useState([12, 24, 36]);
  const [queue, setQueue] = useState([10, 20, 30]);
  const [linkedList, setLinkedList] = useState([5, 15, 25, 35]);
  const [binaryTree, setBinaryTree] = useState([1, 2, 3, 4, 5, 6]);
  const [bstValues, setBstValues] = useState([30, 20, 40, 10, 25, 35, 50]);

  const parsedValue = Number(valueInput);

  const bstRoot = useMemo(() => buildBST(bstValues), [bstValues]);
  const bstLevels = useMemo(() => treeLevels(bstRoot), [bstRoot]);

  const handleAdd = () => {
    if (Number.isNaN(parsedValue)) {
      toast.error("Enter a valid number");
      return;
    }

    if (activeTab === "stack") setStack((prev) => [...prev, parsedValue]);
    if (activeTab === "queue") setQueue((prev) => [...prev, parsedValue]);
    if (activeTab === "linked-list") setLinkedList((prev) => [...prev, parsedValue]);
    if (activeTab === "binary-tree") setBinaryTree((prev) => [...prev, parsedValue]);
    if (activeTab === "bst") setBstValues((prev) => [...prev, parsedValue]);

    toast.success("Value inserted");
  };

  const handleRemove = () => {
    if (activeTab === "stack") {
      setStack((prev) => prev.slice(0, -1));
      return;
    }

    if (activeTab === "queue") {
      setQueue((prev) => prev.slice(1));
      return;
    }

    if (activeTab === "linked-list") {
      setLinkedList((prev) => prev.slice(1));
      return;
    }

    if (activeTab === "binary-tree") {
      setBinaryTree((prev) => prev.slice(0, -1));
      return;
    }

    if (activeTab === "bst") {
      setBstValues((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel-glass rounded-2xl p-4 md:p-5">
        <h1 className="font-display text-2xl font-bold">Data Structure Visualizer</h1>
        <p className="mt-1 text-sm text-base-content/70">Interact with core structures and observe behavior live.</p>

        <div className="mt-4 tabs tabs-boxed w-full overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab whitespace-nowrap ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr,auto,auto]">
          <input
            type="number"
            className="input input-bordered"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder="Enter value"
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            <FiPlay /> Insert / Push / Enqueue
          </button>
          <button className="btn btn-error" onClick={handleRemove}>
            Remove / Pop / Dequeue
          </button>
        </div>
      </section>

      <section className="panel-glass rounded-2xl p-4">
        {activeTab === "stack" && (
          <div>
            <h2 className="font-display text-xl font-semibold">Stack (LIFO)</h2>
            <div className="mt-4 flex flex-col-reverse items-center gap-2 rounded-2xl bg-base-200/70 p-4">
              {stack.map((value, idx) => (
                <StructureNode key={`${value}-${idx}`} value={value} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "queue" && (
          <div>
            <h2 className="font-display text-xl font-semibold">Queue (FIFO)</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-base-200/70 p-4">
              {queue.map((value, idx) => (
                <StructureNode key={`${value}-${idx}`} value={value} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "linked-list" && (
          <div>
            <h2 className="font-display text-xl font-semibold">Linked List</h2>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-base-200/70 p-4">
              {linkedList.map((value, idx) => (
                <div key={`${value}-${idx}`} className="flex items-center gap-2">
                  <StructureNode value={value} />
                  {idx < linkedList.length - 1 && <span className="font-mono text-base-content/70">-&gt;</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "binary-tree" && (
          <div>
            <h2 className="font-display text-xl font-semibold">Binary Tree (Level Order)</h2>
            <div className="mt-4 grid gap-2 rounded-2xl bg-base-200/70 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {binaryTree.map((value, idx) => (
                <div key={`${value}-${idx}`} className="rounded-xl bg-base-100/70 p-3 text-center text-sm">
                  <p className="text-xs text-base-content/60">Node {idx}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bst" && (
          <div>
            <h2 className="font-display text-xl font-semibold">Binary Search Tree</h2>
            <p className="mt-2 text-sm text-base-content/70">In-order traversal: {bstValues.slice().sort((a, b) => a - b).join(", ")}</p>
            <div className="mt-4 space-y-2 rounded-2xl bg-base-200/70 p-4">
              {bstLevels.map((level, levelIndex) => (
                <div key={`level-${levelIndex}`} className="flex flex-wrap justify-center gap-2">
                  {level.map((value, idx) =>
                    value === null ? (
                      <div key={`empty-${levelIndex}-${idx}`} className="h-10 w-10" />
                    ) : (
                      <StructureNode key={`node-${levelIndex}-${idx}`} value={value} />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default DataStructurePage;