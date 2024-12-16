import PropTypes from "prop-types";

export const Table = ({ children, className }) => (
  <table className={className}>{children}</table>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TableHead = ({ children, className }) => (
  <th className={`px-4 py-2 text-left ${className}`}>{children}</th>
);

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export const TableBody = ({ children }) => <tbody>{children}</tbody>;

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TableCell = ({ children, className }) => (
  <td className={`px-4 py-2 ${className}`}>{children}</td>
);

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
