// Exemple de données pour l'arbre
const treeData = {
    name: "Compétences",
    children: [
        {
            name: "Activité 1",
            details: "Détails sur Activité 1",
            children: [
                { name: "Sous-activité 1", details: "Détails sur Sous-activité 1" },
                { name: "Sous-activité 2", details: "Détails sur Sous-activité 2" }
            ]
        },
        {
            name: "Activité 2",
            details: "Détails sur Activité 2",
            children: [
                { name: "Sous-activité 3", details: "Détails sur Sous-activité 3" }
            ]
        }
    ]
};

// Dimensions et marges pour le SVG
const width = 600;
const height = 400;
const margin = { top: 20, right: 90, bottom: 30, left: 90 };

// Créer un SVG
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Créer un arbre
const tree = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

// Convertir les données en structure hiérarchique
const root = d3.hierarchy(treeData);

// Créer l'arbre
tree(root);

// Lier les nœuds et les liens
const link = svg.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

// Créer les nœuds
const node = svg.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => "translate(" + d.y + "," + d.x + ")")
    .on("click", (event, d) => alert(d.data.details)); // Affiche les détails de l'activité

// Ajouter un cercle pour chaque nœud
node.append("circle")
    .attr("r", 10);

// Ajouter un texte pour chaque nœud
node.append("text")
    .attr("dy", 3)
    .attr("x", d => d.children ? -12 : 12)
    .style("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);
