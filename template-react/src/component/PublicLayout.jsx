import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Modal } from "react-bootstrap";
import Input from "./part/Input";
import Button from "./part/Button";
import { useNavigation } from "../utils/useNavigation";

const PublicLayout = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigation();

	useEffect(() => {
		if (showModal) {
			console.log("focus", searchQuery);
		}
	}, [showModal]);

	const handleToggleModal = () => {
		console.log("Toggle Modal");
		setShowModal(!showModal);
	};

	const handleSearch = () => {
		const text = searchQuery.current.value;
		console.log("search", text);
		window.location.href = "/search/" + text;
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const searchQuery = useRef();
	return (
		<>
			<Header handleToggleModal={handleToggleModal} />
			{children}
			{showModal && (
				<Modal show={showModal} onHide={handleToggleModal} size="l">
					<Modal.Header closeButton>
						<Modal.Title>Pencarian</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="flex-fill mb-2">
							<div className="input-group">
								<Input
									ref={searchQuery}
									forInput="searchQuery"
									placeholder="Cari"
									onKeyDown={handleKeyDown}
									autoFocus={true}
								/>
								<Button
									iconName="search"
									classType="primary px-4"
									title="Cari"
									onClick={handleSearch}
								/>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			)}
			<a
				href={`https://wa.me/${import.meta.env.VITE_PHONE}`}
				className="float"
				target="_blank"
			>
				<i className="fi fi-brands-whatsapp my-float"></i>
			</a>
			<Footer />
		</>
	);
};

export default PublicLayout;
