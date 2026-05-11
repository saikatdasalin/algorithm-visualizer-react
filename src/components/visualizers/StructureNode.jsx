function StructureNode({ value }) {
  return (
    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 px-3 text-sm font-bold text-white shadow-md">
      {value}
    </div>
  );
}

export default StructureNode;
