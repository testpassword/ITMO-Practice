try {
    // some unsafe code in iframe
} catch (e) {
    window.parent.document.dispatchEvent(
        new CustomEvent('notification/error', { detail: e })
    )
}

window.document.addEventListener(
    'notification/error', 
    e => { /* handling in parent */}, 
    false
)