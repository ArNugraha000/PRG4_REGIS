// ModalWebView.jsx

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Iframe from "react-iframe";

const ModalWebView = ({ show, handleClose, url, title }) => {
	const [loading, setLoading] = useState(true);

	return (
		<Modal show={show} onHide={handleClose} size="xl" fullscreen>
			<Modal.Header closeButton>
				<Modal.Title>{title} Detail</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Iframe
					url={url}
					width="100%"
					height="100%"
					id="webview-frame"
					display="initial"
					onLoad={() => setLoading(false)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Tutup
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalWebView;
