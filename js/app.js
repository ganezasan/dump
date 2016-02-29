var Cart=function(){this.items=[],this.amount=0,this.addItem=function(t){this.items.push(t),this.amount+=t.amount},this.cancelItem=function(t){this.items=this.items.filter(function(n){return n.number!==t.number}),this.amount-=t.amount},this.checkItem=function(t){return this.items.filter(function(n){return n.number===t.number}).length>0}};
function init(){marked.setOptions({renderer:new marked.Renderer,gfm:!0,tables:!0,breaks:!0,pedantic:!1,sanitize:!0,smartLists:!0,smartypants:!1}),d3.json("https://api.github.com/repos/ganezasan/dump/issues?state=all&per_page=100",function(t,e){this.openIssues=e.filter(function(t){return"open"===t.state&&void 0===t.pull_request}),this.closedIssues=e.filter(function(t){return"closed"===t.state&&void 0===t.pull_request}),initTable(this.openIssues,"#SaleItems"),initTable(this.closedIssues,"#SoldItems")}),$("#tabs li").on("click",function(t){$('#tabs li[class="active"]').removeClass("active"),$(this).attr("class","active"),$(".main table").css("display","none"),$('.main[data-type="'+$(this).attr("data-type")+'"] table').css("display","block")})}function initTable(t,e){var a=d3.select(e).select("tbody"),n=a.selectAll("tr").data(t);td=n.enter().append("tr").append("td"),n.exit().remove(),td.append("h2").append("a").attr("xlink:href",function(t){return t.html_url}).attr("xlink:target","_blank").html(function(t){return"#"+t.number+" : "+t.title}).on("click",function(t){window.open().location.href=t.html_url}),td.append("text").attr("class","detail").attr("dy",".3em").style("text-anchor","middle").html(function(t){return marked(t.body)}),setImageViewer(e)}function setImageViewer(t){$(t+" tr").each(function(t,e){var a=$(e).find(".detail").find("img").get();if(0!==a.length){$(e).find(".images").remove();var n=$("<ul>").attr("class","images");a.forEach(function(t){$(t).attr("class","img-thumbnail"),n.append($("<li>").append(t))}),$(e).children("td").children("h2").after(n)}}),$(".images").viewer()}init();