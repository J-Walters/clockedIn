

.inputWithButton {
  display: flex;
  width: 100%;
}

.inputWithButton input {
  width: 100%;
  padding: var(--space-sm) 7.5rem var(--space-sm) var(--space-sm); /* space for button */
  border: 2px solid var(--color-retro-olive);
  border-radius: var(--radius-md);
  background: var(--color-cream);
  font-size: var(--font-base);
  color: var(--color-chocolate-brown);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: 'Clash Grotesk', Arial, sans-serif;
}

.inputWithButton button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 2.2rem;
  padding: 0 1rem;
  background: var(--color-muted-mustard);
  color: var(--color-chocolate-brown);
  font-family: 'Clash Grotesk', Arial, sans-serif;
  font-weight: 600;
  font-size: 0.98rem;
  border: 2px solid var(--color-retro-olive);
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  transition: background 0.18s, border-color 0.18s;
  box-shadow: none;
  z-index: 1;
}

.inputWithButton button:hover,
.inputWithButton button:focus {
  background: var(--color-retro-olive);
  color: var(--color-espresso);
  border-color: var(--color-retro-olive);
}

/* .inputWithButton button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 6px 10px;
  font-size: 13px;
  background-color: #fdf6ed;
  color: #7c3a1d;
  border: 1px solid #e2cfc3;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.inputWithButton button:hover {
  background-color: #f9ece3;
  border-color: #ddbcae;
} */

.cancelButton {

}

.cancelButton:hover {

}

.buttonRow {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}
