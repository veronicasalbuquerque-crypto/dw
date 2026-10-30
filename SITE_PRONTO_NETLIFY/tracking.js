(function () {
  try {
    var STORAGE_UTM = "flor_utm";
    var STORAGE_SID = "flor_sid";
    var STORAGE_GCLID = "flor_gclid";

    var keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_campaign_name",
      "utm_adgroup",
      "utm_ad",
      "utm_keyword",
      "utm_matchtype",
      "utm_device",
      "utm_network",
      "utm_term",
      "utm_content",
      "gclid",
      "gad_source",
      "gad_campaignid",
      "gad_adgroupid",
      "gad_creative",
    ];

    var params = new URLSearchParams(window.location.search);
    var fromUrl = {};
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = params.get(k);
      if (v) fromUrl[k] = v;
    }

    var stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_UTM) || "{}") || {};
    } catch (_) {
      stored = {};
    }

    var utm = Object.assign({}, stored, fromUrl);

    if (!utm.utm_keyword && utm.utm_term) utm.utm_keyword = utm.utm_term;
    if (!utm.utm_ad && utm.utm_content) utm.utm_ad = utm.utm_content;
    if (!utm.utm_campaign_name && utm.utm_campaign) utm.utm_campaign_name = utm.utm_campaign;

    var gclid =
      fromUrl.gclid ||
      sessionStorage.getItem("_gclid") ||
      localStorage.getItem(STORAGE_GCLID);
    if (gclid) {
      utm.gclid = gclid;
      localStorage.setItem(STORAGE_GCLID, gclid);
      try {
        sessionStorage.setItem("_gclid", gclid);
      } catch (_) {}
    }

    if (utm.gclid && !utm.utm_source) {
      utm.utm_source = "google";
      if (!utm.utm_medium) utm.utm_medium = "cpc";
    }

    if (!utm.utm_campaign && utm.gad_campaignid) utm.utm_campaign = utm.gad_campaignid;
    if (!utm.utm_adgroup && utm.gad_adgroupid) utm.utm_adgroup = utm.gad_adgroupid;
    if (!utm.utm_ad && utm.gad_creative) utm.utm_ad = utm.gad_creative;

    var hadUrlParams = Object.keys(fromUrl).length > 0;

    if (Object.keys(utm).length) {
      localStorage.setItem(STORAGE_UTM, JSON.stringify(utm));
    }

    var sid = localStorage.getItem(STORAGE_SID);
    if (!sid) {
      sid =
        (window.crypto && crypto.randomUUID
          ? crypto.randomUUID()
          : "sid-" + Math.random().toString(16).slice(2)) +
        "-" +
        Date.now();
      localStorage.setItem(STORAGE_SID, sid);
    }

    window.__flor_sid = sid;
    window.__flor_utm = utm;

    if (hadUrlParams && Object.keys(utm).length) {
      fetch("/flor/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sid: sid,
          page: window.location.pathname || "/",
          utm: utm,
        }),
      }).catch(function () {});
    }
  } catch (_) {}
})();
