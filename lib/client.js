window.__ModuleLoader__.load({
	id: "dsh-image-conatiner",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:ImageContainer.module.css.mjs
		const css = "._6oCXqG_gallery{grid-template-columns:repeat(2,minmax(0,1fr));align-self:flex-start;gap:8px;width:min(100%,576px);margin-block:4px 8px;display:grid}._6oCXqG_gallery[data-count=\"1\"]{grid-template-columns:minmax(0,1fr)}._6oCXqG_gallery[data-count=\"3\"] ._6oCXqG_asset:nth-child(3){grid-column:1/-1}._6oCXqG_gallery[data-count=\"3\"] ._6oCXqG_asset:nth-child(3) ._6oCXqG_tile,._6oCXqG_gallery[data-count=\"3\"] ._6oCXqG_asset:nth-child(3) ._6oCXqG_retry{aspect-ratio:2.04}._6oCXqG_gallery[data-compact=true]{grid-template-columns:repeat(3,minmax(0,1fr))}._6oCXqG_asset{min-width:0;min-height:0}._6oCXqG_tile,._6oCXqG_retry{aspect-ratio:1;border:1px solid var(--dsw-alias-border-l2-darkmode-thin);background:var(--dsw-alias-interactive-bg-hover);width:100%;min-width:0;color:var(--dsw-alias-label-secondary);border-radius:14px;padding:0;display:grid;position:relative;overflow:hidden}._6oCXqG_gallery[data-count=\"1\"] ._6oCXqG_tile,._6oCXqG_gallery[data-count=\"1\"] ._6oCXqG_retry{aspect-ratio:var(--dic-ratio,1.3333);max-height:520px}._6oCXqG_tile{cursor:zoom-in;place-items:center}._6oCXqG_tile:disabled{cursor:wait}._6oCXqG_tile:focus-visible,._6oCXqG_retry:focus-visible,._6oCXqG_lightboxAction:focus-visible,._6oCXqG_nav:focus-visible,._6oCXqG_previewRetry:focus-visible,._6oCXqG_filmstripItem:focus-visible{outline:2px solid var(--dsw-alias-label-primary-bluish);outline-offset:2px}._6oCXqG_tile img{object-fit:cover;width:100%;height:100%;transition:transform var(--ds-transition-duration-fast,.16s) var(--ds-ease-in-out,ease);display:block}._6oCXqG_tile:hover img,._6oCXqG_tile:focus-visible img{transform:scale(1.015)}._6oCXqG_skeleton{background:var(--dsw-alias-bg-skeleton);animation:1.4s ease-in-out infinite alternate _6oCXqG_pulse;position:absolute;inset:0}._6oCXqG_expand{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);width:32px;height:32px;color:var(--dsw-alias-label-primary);box-shadow:var(--dsw-shadow-lv2);opacity:0;transition:opacity var(--ds-transition-duration-fast,.16s) ease, transform var(--ds-transition-duration-fast,.16s) ease;border-radius:999px;place-items:center;display:grid;position:absolute;top:10px;right:10px;transform:translateY(-3px)}._6oCXqG_tile:hover ._6oCXqG_expand,._6oCXqG_tile:focus-visible ._6oCXqG_expand{opacity:1;transform:translateY(0)}._6oCXqG_retry{font:inherit;cursor:pointer;place-content:center;justify-items:center;gap:8px;font-size:13px;line-height:20px}._6oCXqG_retry:hover{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-label-primary)}._6oCXqG_lightbox{--dic-lightbox-control-bg:var(--dsw-alias-bg-overlay);--dic-lightbox-control-fg:var(--dsw-alias-label-primary);z-index:1000;place-items:center;padding:72px 96px 108px;display:grid;position:fixed;inset:0}._6oCXqG_mask{background:var(--dsw-alias-bg-mask-photo);position:absolute;inset:0}._6oCXqG_counter,._6oCXqG_actions,._6oCXqG_stage,._6oCXqG_nav,._6oCXqG_filmstrip{z-index:1;position:relative}._6oCXqG_counter{border:1px solid var(--dsw-alias-border-inverted2);background:var(--dic-lightbox-control-bg);min-width:58px;color:var(--dic-lightbox-control-fg);text-align:center;border-radius:999px;padding:7px 12px;font-size:13px;line-height:18px;position:fixed;top:22px;left:50%;transform:translate(-50%)}._6oCXqG_actions{gap:8px;display:flex;position:fixed;top:18px;right:20px}._6oCXqG_lightboxAction,._6oCXqG_nav{border:1px solid var(--dsw-alias-border-inverted2);background:var(--dic-lightbox-control-bg);color:var(--dic-lightbox-control-fg);box-shadow:var(--dsw-shadow-lv2);cursor:pointer;border-radius:999px;place-items:center;padding:0;display:grid}._6oCXqG_lightboxAction{width:40px;height:40px;text-decoration:none}._6oCXqG_lightboxAction:hover,._6oCXqG_nav:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}._6oCXqG_stage{place-items:center;width:100%;min-width:0;height:100%;min-height:0;display:grid}._6oCXqG_preview{object-fit:contain;max-width:min(100%,1600px);max-height:calc(100vh - 180px);box-shadow:var(--dsw-shadow-lv3);border-radius:12px;display:block}._6oCXqG_previewStatus,._6oCXqG_previewRetry{border:1px solid var(--dsw-alias-border-inverted2);background:var(--dic-lightbox-control-bg);min-height:44px;color:var(--dic-lightbox-control-fg);font:inherit;border-radius:12px;align-items:center;gap:8px;padding:10px 16px;font-size:13px;line-height:20px;display:inline-flex}._6oCXqG_previewRetry{cursor:pointer}._6oCXqG_nav{width:46px;height:46px;position:fixed;top:50%;transform:translateY(-50%)}._6oCXqG_nav[data-direction=previous]{left:24px}._6oCXqG_nav[data-direction=next]{right:24px}._6oCXqG_filmstrip{border:1px solid var(--dsw-alias-border-inverted2);background:var(--dic-lightbox-control-bg);max-width:min(100vw - 48px,720px);box-shadow:var(--dsw-shadow-lv2);border-radius:14px;gap:8px;padding:8px;display:flex;position:fixed;bottom:18px;left:50%;overflow-x:auto;transform:translate(-50%)}._6oCXqG_filmstripItem{border:2px solid var(--dsw-alias-border-inverted2);background:var(--dsw-alias-bg-skeleton);cursor:pointer;opacity:.66;border-radius:10px;flex:none;place-items:center;width:52px;height:52px;padding:0;display:grid;overflow:hidden}._6oCXqG_filmstripItem[aria-current=true]{border-color:var(--dic-lightbox-control-fg);opacity:1}._6oCXqG_filmstripItem img,._6oCXqG_filmstripItem span{object-fit:cover;width:100%;height:100%;display:block}._6oCXqG_filmstripItem span[data-state=error]{background:var(--dsw-alias-interactive-bg-hover-danger)}._6oCXqG_srOnly{clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}@keyframes _6oCXqG_pulse{0%{opacity:.5}to{opacity:1}}@media (width<=720px){._6oCXqG_gallery[data-compact=true]{grid-template-columns:repeat(2,minmax(0,1fr))}._6oCXqG_lightbox{padding:68px 18px 104px}._6oCXqG_preview{max-height:calc(100vh - 172px)}._6oCXqG_nav{width:40px;height:40px;top:auto;bottom:22px;transform:none}._6oCXqG_nav[data-direction=previous]{left:16px}._6oCXqG_nav[data-direction=next]{right:16px}._6oCXqG_filmstrip{max-width:calc(100vw - 144px)}}@media (hover:none),(pointer:coarse){._6oCXqG_expand{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){._6oCXqG_tile img,._6oCXqG_expand{transition:none}._6oCXqG_skeleton{animation:none}}";
		const tagId = "dsh-image-conatiner/ImageContainer.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-image-conatiner";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ImageContainer_module_css_default = {
			"lightbox": "_6oCXqG_lightbox",
			"mask": "_6oCXqG_mask",
			"previewStatus": "_6oCXqG_previewStatus",
			"actions": "_6oCXqG_actions",
			"nav": "_6oCXqG_nav",
			"tile": "_6oCXqG_tile",
			"gallery": "_6oCXqG_gallery",
			"previewRetry": "_6oCXqG_previewRetry",
			"skeleton": "_6oCXqG_skeleton",
			"filmstripItem": "_6oCXqG_filmstripItem",
			"preview": "_6oCXqG_preview",
			"lightboxAction": "_6oCXqG_lightboxAction",
			"expand": "_6oCXqG_expand",
			"counter": "_6oCXqG_counter",
			"stage": "_6oCXqG_stage",
			"filmstrip": "_6oCXqG_filmstrip",
			"retry": "_6oCXqG_retry",
			"asset": "_6oCXqG_asset",
			"srOnly": "_6oCXqG_srOnly",
			"pulse": "_6oCXqG_pulse"
		};
		//#endregion
		//#region src/client/ImageContainer.tsx
		const LOADING = { status: "loading" };
		function itemKey(attachment, index) {
			return `${String(attachment.attachmentId)}:${String(index)}`;
		}
		function itemName(item, t) {
			return item.attachment.name ?? t("image.name", { index: item.index + 1 });
		}
		function fileExtension(mediaType) {
			switch (mediaType) {
				case "image/jpeg": return "jpg";
				case "image/webp": return "webp";
				case "image/gif": return "gif";
				default: return "png";
			}
		}
		function downloadName(item, items) {
			const name = item.attachment.name;
			if (name === void 0) return `image-${String(item.index + 1)}.${fileExtension(item.attachment.mediaType)}`;
			if (items.filter((candidate) => candidate.attachment.name === name).length === 1) return name;
			const dot = name.lastIndexOf(".");
			const suffix = `-${String(item.index + 1)}`;
			return dot > 0 ? `${name.slice(0, dot)}${suffix}${name.slice(dot)}` : `${name}${suffix}`;
		}
		function sameState(left, right) {
			if (left?.status !== right.status) return false;
			return left.status !== "loaded" || right.status === "loaded" && left.src === right.src;
		}
		function singleStyle(item, count) {
			if (count !== 1) return void 0;
			const natural = item.attachment.width / item.attachment.height;
			return { "--dic-ratio": String(Math.min(1.8, Math.max(.72, natural))) };
		}
		function ImageAsset({ item, count, state, attempt, loadImage, onState, onOpen, onRetry, t }) {
			(0, react.useEffect)(() => {
				let live = true;
				onState(item.key, LOADING);
				loadImage(item.attachment).then((src) => {
					if (live) onState(item.key, {
						status: "loaded",
						src
					});
				}).catch(() => {
					if (live) onState(item.key, { status: "error" });
				});
				return () => {
					live = false;
				};
			}, [
				attempt,
				item.key,
				loadImage,
				onState
			]);
			const name = itemName(item, t);
			if (state.status === "error") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: ImageContainer_module_css_default.retry,
				"aria-label": t("image.retry", { name }),
				onClick: () => {
					onRetry(item.key);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, { size: 18 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("image.failed") })]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: ImageContainer_module_css_default.tile,
				style: singleStyle(item, count),
				"data-state": state.status,
				"aria-label": t("image.openNamed", { name }),
				"aria-busy": state.status === "loading" || void 0,
				title: t("image.open"),
				disabled: state.status === "loading",
				onClick: (event) => {
					onOpen(item.index, event.currentTarget);
				},
				children: [state.status === "loaded" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
					src: state.src,
					alt: name
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: ImageContainer_module_css_default.skeleton,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ImageContainer_module_css_default.srOnly,
						children: t("image.loading")
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: ImageContainer_module_css_default.expand,
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFullscreenOutline16, { size: 16 })
				})]
			});
		}
		function Lightbox({ items, assets, index, opener, onIndex, onClose, onRetry, t }) {
			const dialogRef = (0, react.useRef)(null);
			const closeRef = (0, react.useRef)(null);
			const titleId = (0, react.useId)();
			const count = items.length;
			const item = items[index];
			const state = assets[item.key] ?? LOADING;
			const name = itemName(item, t);
			const move = (0, react.useCallback)((delta) => {
				onIndex((index + delta + count) % count);
			}, [
				count,
				index,
				onIndex
			]);
			(0, react.useEffect)(() => {
				const previousOverflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
				closeRef.current?.focus();
				return () => {
					document.body.style.overflow = previousOverflow;
					opener?.focus();
				};
			}, [opener]);
			(0, react.useEffect)(() => {
				const onKeyDown = (event) => {
					if (event.key === "Escape") {
						event.preventDefault();
						onClose();
						return;
					}
					if (event.key === "ArrowLeft" && count > 1) {
						event.preventDefault();
						move(-1);
						return;
					}
					if (event.key === "ArrowRight" && count > 1) {
						event.preventDefault();
						move(1);
						return;
					}
					if (event.key !== "Tab") return;
					const focusable = dialogRef.current?.querySelectorAll("button:not(:disabled), a[href], [tabindex]:not([tabindex=\"-1\"])");
					if (focusable === void 0 || focusable.length === 0) return;
					const first = focusable[0];
					const last = focusable[focusable.length - 1];
					if (event.shiftKey && document.activeElement === first) {
						event.preventDefault();
						last.focus();
					} else if (!event.shiftKey && document.activeElement === last) {
						event.preventDefault();
						first.focus();
					}
				};
				window.addEventListener("keydown", onKeyDown);
				return () => {
					window.removeEventListener("keydown", onKeyDown);
				};
			}, [
				count,
				move,
				onClose
			]);
			return (0, react_dom.createPortal)(/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: dialogRef,
				className: ImageContainer_module_css_default.lightbox,
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": titleId,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
						id: titleId,
						className: ImageContainer_module_css_default.srOnly,
						children: t("preview.title")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ImageContainer_module_css_default.mask,
						"aria-hidden": "true",
						onMouseDown: onClose
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ImageContainer_module_css_default.counter,
						"aria-live": "polite",
						children: t("preview.counter", {
							current: index + 1,
							total: count
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ImageContainer_module_css_default.actions,
						children: [state.status === "loaded" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
							className: ImageContainer_module_css_default.lightboxAction,
							href: state.src,
							download: downloadName(item, items),
							"aria-label": t("preview.download"),
							title: t("preview.download"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconDownloadOutline16, { size: 17 })
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							ref: closeRef,
							type: "button",
							className: ImageContainer_module_css_default.lightboxAction,
							"aria-label": t("preview.close"),
							title: t("preview.close"),
							onClick: onClose,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCloseOutline16, { size: 18 })
						})]
					}),
					count > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: ImageContainer_module_css_default.nav,
						"data-direction": "previous",
						"aria-label": t("preview.previous"),
						title: t("preview.previous"),
						onClick: () => {
							move(-1);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronLeftOutline14, { size: 20 })
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: ImageContainer_module_css_default.nav,
						"data-direction": "next",
						"aria-label": t("preview.next"),
						title: t("preview.next"),
						onClick: () => {
							move(1);
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronRightOutline14, { size: 20 })
					})] }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ImageContainer_module_css_default.stage,
						"aria-live": "polite",
						children: [
							state.status === "loaded" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
								className: ImageContainer_module_css_default.preview,
								src: state.src,
								alt: name
							}),
							state.status === "loading" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: ImageContainer_module_css_default.previewStatus,
								role: "status",
								children: t("image.loading")
							}),
							state.status === "error" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: ImageContainer_module_css_default.previewRetry,
								onClick: () => {
									onRetry(item.key);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline16, { size: 18 }), t("image.retry", { name })]
							})
						]
					}),
					count > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: ImageContainer_module_css_default.filmstrip,
						"aria-label": t("gallery.label"),
						children: items.map((candidate) => {
							const candidateState = assets[candidate.key] ?? LOADING;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ImageContainer_module_css_default.filmstripItem,
								"aria-current": candidate.index === index ? "true" : void 0,
								"aria-label": t("image.openNamed", { name: itemName(candidate, t) }),
								onClick: () => {
									onIndex(candidate.index);
								},
								children: candidateState.status === "loaded" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
									src: candidateState.src,
									alt: ""
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { "data-state": candidateState.status })
							}, candidate.key);
						})
					})
				]
			}), document.body);
		}
		/** Codex-style responsive gallery and group-aware original-image preview. */
		function ImageContainer({ matched, t }) {
			const items = (0, react.useMemo)(() => matched.images.map(({ attachment }, index) => ({
				key: itemKey(attachment, index),
				attachment,
				index
			})), [matched.images]);
			const [assets, setAssets] = (0, react.useState)({});
			const [attempts, setAttempts] = (0, react.useState)({});
			const [openIndex, setOpenIndex] = (0, react.useState)(null);
			const openerRef = (0, react.useRef)(null);
			const updateAsset = (0, react.useCallback)((key, next) => {
				setAssets((current) => sameState(current[key], next) ? current : {
					...current,
					[key]: next
				});
			}, []);
			const retry = (0, react.useCallback)((key) => {
				setAttempts((current) => ({
					...current,
					[key]: (current[key] ?? 0) + 1
				}));
			}, []);
			const open = (0, react.useCallback)((index, opener) => {
				openerRef.current = opener;
				setOpenIndex(index);
			}, []);
			const close = (0, react.useCallback)(() => {
				setOpenIndex(null);
			}, []);
			(0, react.useEffect)(() => {
				if (openIndex !== null && openIndex >= items.length) setOpenIndex(items.length === 0 ? null : items.length - 1);
			}, [items.length, openIndex]);
			if (items.length === 0) return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: ImageContainer_module_css_default.gallery,
				"data-count": items.length <= 4 ? String(items.length) : "many",
				"data-compact": items.length > 4 || void 0,
				role: "group",
				"aria-label": t("gallery.label"),
				children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: ImageContainer_module_css_default.asset,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ImageAsset, {
						item,
						count: items.length,
						state: assets[item.key] ?? LOADING,
						attempt: attempts[item.key] ?? 0,
						loadImage: matched.loadImage,
						onState: updateAsset,
						onOpen: open,
						onRetry: retry,
						t
					})
				}, item.key))
			}), openIndex !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Lightbox, {
				items,
				assets,
				index: openIndex,
				opener: openerRef.current,
				onIndex: setOpenIndex,
				onClose: close,
				onRetry: retry,
				t
			})] });
		}
		//#endregion
		//#region src/client/locales.ts
		/** `image-container` namespace dictionaries. */
		const zh = {
			"gallery.label": "生成图片",
			"image.name": "图片 {index}",
			"image.open": "查看大图",
			"image.openNamed": "查看图片 {name}",
			"image.loading": "图片加载中",
			"image.failed": "图片加载失败",
			"image.retry": "重试加载 {name}",
			"preview.title": "图片预览",
			"preview.close": "关闭图片预览",
			"preview.previous": "上一张图片",
			"preview.next": "下一张图片",
			"preview.download": "下载原图",
			"preview.counter": "{current} / {total}"
		};
		const en = {
			"gallery.label": "Generated images",
			"image.name": "Image {index}",
			"image.open": "Open large preview",
			"image.openNamed": "Open image {name}",
			"image.loading": "Loading image",
			"image.failed": "Image failed to load",
			"image.retry": "Retry loading {name}",
			"preview.title": "Image preview",
			"preview.close": "Close image preview",
			"preview.previous": "Previous image",
			"preview.next": "Next image",
			"preview.download": "Download original",
			"preview.counter": "{current} / {total}"
		};
		//#endregion
		//#region src/client/index.ts
		const NS = "image-container";
		const name = "dsh-image-conatiner-client";
		const inject = ["slots", "locale"];
		function selectImages(owner) {
			return owner.images.length === 0 ? null : owner;
		}
		/** Register dictionaries and claim every non-empty assistant image group. */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-image-conatiner: dictionaries");
			ctx.slots.inject("conversation.chat.assistant.images", () => ctx.slots.register({
				name: "conversation.chat.assistant.images",
				select: selectImages,
				locale: NS
			}, ImageContainer));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map